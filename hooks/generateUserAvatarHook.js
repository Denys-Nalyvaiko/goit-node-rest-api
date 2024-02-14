import gravatar from "gravatar";

export async function generateUserAvatarHook(next) {
  if (!this.isNew) {
    return;
  }

  this.avatarURL = gravatar.url(this.email, { protocol: "http", s: 250 });

  next();
}
