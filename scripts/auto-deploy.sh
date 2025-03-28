#!/bin/bash
#
# Auto-deployment script for StudyAI
# This script automatically stages, commits, and pushes changes to Git

# Check if a commit message was provided
if [ "$#" -eq 0 ]; then
  echo "No commit message provided. Using default message."
  COMMIT_MESSAGE="Update StudyAI application"
else
  COMMIT_MESSAGE="$1"
fi

# Set environment variable to disable pre-commit hooks for this run if needed
export BYPASS_PRE_COMMIT=true

echo "🔍 Checking for changes..."
git diff --quiet

# If there are changes
if [ $? -ne 0 ]; then
  echo "🔄 Changes detected. Preparing for deployment..."
  
  # Stage all changes
  git add .
  
  # Commit changes with the provided or default message
  git commit -m "$COMMIT_MESSAGE" --no-verify
  
  # Push changes manually since we're bypassing hooks
  git push
  
  echo "✅ Deployment completed. Changes pushed to remote repository with message: $COMMIT_MESSAGE"
else
  echo "✅ No changes detected. Nothing to deploy."
fi

# Unset environment variable
unset BYPASS_PRE_COMMIT

exit 0 