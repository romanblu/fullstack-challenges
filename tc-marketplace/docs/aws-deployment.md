### Launching EC2

1. Name the server , e.g backend-server
2. Choose AMI: ubuntu 24.04 LTS - best for Node.js
3. instance type : t3.micro 
4. Click “Create key pair”
    1. private key format .pem
    2. download and store it somewhere safe
5. Network settings. click edit and add the following rules:

| Type | Port | Source | Description |
| --- | --- | --- | --- |
| SSH | 22 | My IP | Connect to server |
| HTTP | 80 | 0.0.0.0/0 | Website access |
| HTTPS | 443 | 0.0.0.0/0 | Secure access |
| Custom TCP | 5000 | 0.0.0.0/0 | API |
1. Launch and wait 
2. Create elastic IP and attach to the EC2 instance (so the IP wont change on instance restart)
3. SSH into the instance:    ssh -i "backend-key.pem" [ubuntu@ec2-[ public IP  ].compute-1.amazonaws.com](mailto:ubuntu@ec2-13-221-76-123.compute-1.amazonaws.com)
4. update and install node.js

```bash
sudo apt update
sudo apt install -y nodejs npm
node -v
```

1. Upload backend code

```bash
git clone your-repo-url
cd backend
npm install
```

### Create MongoDB database

1. Create MongoDB cluster (free tier) 
2. Provider choose AWS, any close region, create user and save credentials
3. Download MongoDB Compass and connect to the cluster 
4. In mongodb atlas edit network access to : 0.0.0.0/0
5. add the URI to .env under /backend mongodb+srv://DB_USER:PASSWORD@cluster.mongodb.net/tc-marketplace?retryWrites=true&w=majority

1. nano .env 
    
    ```bash
    MONGO_URI=mongodb+srv://DB_USER:PASSWORD@cluster.mongodb.net/tc-marketplace?retryWrites=true&w=majority
    JWT_SECRET=secret
    JWT_EXPIRES_IN=7d
    PORT=5000
    ```
    
2. Run backend with PM2 :
    
    ```bash
    sudo npm install -g pm2
    pm2 start server.js
    pm2 save
    pm2 startup
    ```
    
3. run the following commands to seed the database with data:
    
    `npm run seed:categories` `npm run seed:data` 
    
4. sudo nano /etc/nginx/sites-available/default  replace with the following configuration

```bash
server {
    listen 80;
    listen [::]:80;

    server_name [instance elastic IP];

    # Serve React frontend
    root /var/www/frontend/build;
    index index.html index.htm;

    # React SPA routing
    location / {
        try_files $uri /index.html;
    }

    # Proxy API requests to Node backend
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Optional: logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

}

```

1. sudo systemctl restart nginx
2. Check if the server is running :
    1. run `pm2 list` and check for the name of the app (server or backend)
    2. run `pm2 logs server` and check for `Server running on port 5000` and `MongoDB connected` 
    

### Deploying frontend

1. Create S3 bucket:
    1. Give a unique bucket name
    2. enable all public access 
    3. enable bucket versioning 
2. .env update `VITE_API_URL=http://YOUR_EC2_ELASTIC_IP/api` 
3. Build the project `npm run build` then upload all files under dist/ to the bucket
4. Go to `properties` and enable Static website hosting on S3. Point index and error documents to index.html
5.  Go to `permissions` edit bucket policy and add :
    
    ```bash
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
      ]
    }
    ```
    
6. enable cors in server.js:
    
    ```bash
    app.use(cors({
        origin: [
          'http://localhost:5173',  // dev
          "http://tc-marketplace-react-frontend.s3-website-us-east-1.amazonaws.com/" // production
        ], 
        credentials: true,
    }));
    
    ```