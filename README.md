# ConfessionAngular -  Angular CLI version 14.2.12.

    d26q31pmxe2fsg.cloudfront.net
    Guest account:  username / password  =>   user1 / user1password

Please note that: 
-   CloundFront use Amazon SSL Certificate
-   Backend use Self-sign SSL Certificate

## Code scaffolding

      # Nodes modules
         # Install CLI
      sudo npm install -g @angular/cli@14.2.12
    
    
      # LocalStorage
      sudo npm install --save ngx-webstorage --legacy-peer-deps
    
      # sending notification
      sudo npm install ngx-toastr@15.2.2  --save --legacy-peer-deps
      sudo npm install @angular/animations --save --force
    
    
      # Font
      sudo npm install @fortawesome/fontawesome-svg-core --force
      sudo npm install @fortawesome/free-solid-svg-icons --force
      sudo npm i @fortawesome/angular-fontawesome@0.11.1 --force
      sudo npm install --save  @ng-bootstrap/ng-bootstrap --force
      npm install --save @tinymce/tinymce-angular
      ng add @angular/localize
    
    
      #Component and service
      ng g c header
      ng g c auth/signup
      ng generate service auth/shared/auth 
      ng generate c auth/login
      ng g c home
      ng generate service shared/post
      ng g c shared/post-tile
      ng g c shared/vote-button
      ng g c shared/side-bar
      ng g c shared/subreddit-side-bar
      ng g s subreddit/subreddit
      ng g c subreddit/create-subreddit
      ng g c post/create-post
      ng g component post/view-post
      ng g s comment/comment
      ng g c auth/user-profile
      ng g s shared/vote
    
      # Build and deploy
      ng build --configuration production


 # Deployment: 

<img width="618" alt="Screenshot 2023-08-16 at 12 24 29" src="https://github.com/lebronjamesuit/social-media-angular14/assets/11584601/4687ce21-f771-4057-a2d4-82e1e0505859">


-  Use CloudFront: free HTTPS, cached system and Cloudfront edge locations world wide.
  
          
-  AWS S3
  

# Sign up
<img width="1280" alt="Screenshot 2023-08-16 at 12 33 27" src="https://github.com/lebronjamesuit/social-media-angular14/assets/11584601/08268e0f-3b04-484d-98fa-7762e5f2d113">

<img width="954" alt="image" src="https://github.com/lebronjamesuit/social-media-angular14/assets/11584601/40441b38-2d26-4693-af81-0f3d3f1c2e45">

<img width="1280" alt="image" src="https://github.com/lebronjamesuit/social-media-angular14/assets/11584601/9c810a5b-452b-48cc-b191-c91228db242d">




