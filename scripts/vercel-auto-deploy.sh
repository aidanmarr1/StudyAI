#!/bin/bash
#
# Auto-deployment script for StudyAI to Vercel
# This script automatically stages, commits, and pushes changes to Git
# Then deploys to Vercel

# Check if a commit message was provided
if [ "$#" -eq 0 ]; then
  echo "No commit message provided. Using default message."
  COMMIT_MESSAGE="Update StudyAI application"
else
  COMMIT_MESSAGE="$1"
fi

echo "🔍 Checking for changes..."
git diff --quiet

# If there are changes
if [ $? -ne 0 ]; then
  echo "🔄 Changes detected. Preparing for deployment..."
  
  # Stage all changes
  git add .
  
  # Commit changes with the provided or default message
  git commit -m "$COMMIT_MESSAGE"
  
  # Push changes
  git push
  
  echo "🚀 Deploying to Vercel..."
  vercel --prod
  
  echo "✅ Deployment completed. Changes pushed to Git and deployed to Vercel with message: $COMMIT_MESSAGE"
else
  echo "✅ No changes detected. Nothing to deploy."
fi

exit 0 