import User from '../user/user.model.js'
import Store from '../store/store.model.js'
import { hash, compare, signToken } from '../../utils/auth.js';
import logger from '../../utils/logger.js';
import { validateLogin } from './auth.validation.js';

export const registerUser = async (body) => {
  const { name, email, password, role, phone } = body;

  if (!email) {
    throw Error("Missing email")
  }
  
  if (!password) {
    throw Error("Missing password")
  }

  if (!name) {
    throw Error("Missing name")
  }

  const existing = await User.findOne({ email });

  if (existing) {
    throw Error("Email already in use")
  }

  const hashedPw = await hash(password);
  const user = await User.create({ name, email, password: hashedPw, role, phone });
  
  if( role === 'seller' ){
      const { storeName, contactEmail, contactPhone, location, description, category, profilePicture } = body;
      
      
      const store = await Store.create({
          name: storeName,
          slug: slugify(storeName),
          owner: user._id,
          contactEmail: contactEmail,
          contactPhone: contactPhone,
          location: location,
          description: description,
          category: category,
          profilePicture: profilePicture
        })
        
        user.store = store._id;    
    }
    
    await user.save()
    
    const token = signToken({ id: user._id, user: user });
    
    return ({ user, token });
};

export const loginUser = async (email, password) => {
  
  logger.info(`Login attempt for ${email}`);
  
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const ok = await compare(password, user.password);
  
  if (!ok)  {
    throw new Error('Invalid email or password')
  }

  const token = signToken({ id: user._id, role: user.role, store: user.store || null});

  return { user, token}
    
}