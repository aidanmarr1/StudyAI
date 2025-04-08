# Adding the Robot Image

To use the robot image you've provided:

1. Save the robot image file as `robot.png` in the `public/images/` directory
2. The image has already been configured in the following locations:
   - Footer component (src/components/Footer.tsx)
   - Favicon and app icons (src/app/layout.tsx)

The image will be automatically used when your application is running.

## Netlify Deployment

This project is now configured for Netlify deployment. To deploy:

1. Push your changes to your Git repository
2. Log into your Netlify account
3. Create a new site from Git and select your repository
4. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

Netlify will automatically use the settings in the `netlify.toml` file at the root of the project. 