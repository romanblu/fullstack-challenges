import slugify from 'slugify';
import BlogPost from './blog.model.js'
import generateAutoSlug from '../../utils/slugGenHelper.js';
export const listBlogPosts = async (filters) => {
    const query = {}

    if (filters?.title) query.title = { $regex: filters.title, $options: 'i' };
    
    const blogPosts = await BlogPost.find(query).limit(100).sort({ createdAt: -1 }).populate('author', 'name email');

    return blogPosts
}

export const listMyBlogPosts = async (id) => {
    const blogPosts = await BlogPost.find({ author: id}).sort({ createdAt: -1 }).populate('author', 'name email');
    return blogPosts
}

export const getBlogPost = async (slug) => {
    const post = await BlogPost.findOne({ slug: slug }).populate('author', 'name email');
    return post
}

export const getFeaturedPosts = async () => {
    const posts = await BlogPost.find({ 
        published: true,
        featured: true
        }).sort({ createdAt: -1})
        .limit(3)
        .select("title slug image excerpt author date createdAt")
        .populate('author', 'name');
    
    return posts    
}

export const createBlogPost = async (body, userId) => {
    const { title, content, image,excerpt, published} = body;
        
    let slug = slugify(title, { lower: true, strict: true });

    const existing = await BlogPost.findOne({ slug });
    if (existing) {
        slug = generateAutoSlug(title);
    }
        
    const post = await BlogPost.create({
      title,
      content,
      image,
      excerpt,
      slug,
      author: userId,
      published: published ?? false,
      date: new Date().toISOString()
    });
    
    return post  
}

export const updateBlogPost = async (data, userId) => {
    const {id, slug, title} = data
    const post = await BlogPost.findById( id )

    if(!post){
        throw Error('Blog post was not found')
    }

    if(post.author.toString() !== userId.toString()){
        throw Error('Only the author can edit this post')
    }

    let newSlug = slug

    // check for duplicates only if slug changed
    if(slug && slug !== post.slug){
      const conflict = BlogPost.findOne({ slug: slug, _id: { $ne: post._id }})

      if(conflict){
        newSlug = generateAutoSlug(slug || title)
      }
    }

    post.title = data.title ?? post.title;
    post.content = data.content ?? post.content;
    post.image = data.image ?? post.image;
    post.excerpt = data.excerpt ?? post.excerpt;
    post.tags = data.tags ?? post.tags;
    post.published = data.published ?? post.published;
    post.slug = newSlug ?? post.slug;

    const updated = await post.save()
    return updated
}

export const deleteBlogPost = async (slug, userId) => {
    
  const post = await BlogPost.findOne({slug})
  if(!post) {
    throw new Error('Not found')
  }

  
  if(post.author.toString() !==userId) {
    throw new Error('Unauthorized')
  }

  await BlogPost.deleteOne(post);
}   