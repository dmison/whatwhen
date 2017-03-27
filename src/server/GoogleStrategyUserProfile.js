Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://people.googleapis.com//v1/people/me',  accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

    // try {
    //   var json = JSON.parse(body);
    //
    //   var profile = { provider: 'google' };
    //   profile.id           = json.id;
    //   profile.displayName  = json.displayName;
    //   profile.name         = json.name;
    //   if (json.birthday) profile.birthday = json.birthday;
    //   if (json.relationshipStatus) profile.relationship = json.relationshipStatus;
    //   if (json.objectType && json.objectType == 'person') {
    //     profile.isPerson = true;
    //   }
    //   if (json.isPlusUser) profile.isPlusUser = json.isPlusUser;
    //   if (json.placesLived) profile.placesLived = json.placesLived;
    //   if (json.language) profile.language = json.language;
    //   if (json.emails) {
    //     profile.emails = json.emails;
    //
    //     profile.emails.some(function(email) {
    //       if (email.type === 'account') {
    //         profile.email = email.value
    //         return true
    //       }
    //     })
    //   }
    //   if (json.gender) profile.gender = json.gender;
    //   if (json.image && json.image.url) {
    //     var photo = {
    //       value: json.image.url
    //     };
    //     if (json.image.isDefault) photo.type = 'default';
    //     profile.photos = [photo];
    //   }
    //
    //   profile._raw = body;
    //   profile._json = json;
    //
    //   done(null, profile);
    // } catch(e) {
    //   done(e);
    // }
    console.log(body);
    done({});
  });
};
