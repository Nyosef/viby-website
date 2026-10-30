# Standing user approval rules

- Never stage files, commit, or push without the user's explicit permission for that specific action. This includes running tools that stage files as a side effect.
- Never create a deployment, including a preview or staged production deployment, or promote or assign a deployment to a live domain without the user's explicit permission for that specific action.
- Authorization to edit, test, or implement a plan does not authorize Git staging, committing, pushing, or deployment. Prepare and verify local changes, then leave them unstaged for the user unless separately authorized.
