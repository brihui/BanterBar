window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQACUV0U_yoVFZE-3Xe4m__xut7I5SnDIo_xUz69SGOY-uVUf6gkwWw8L_I-E7jw0gEfnKlyWZEic9l-Rj1GH6jdrsnpRkhgh1EUUZ9RN6B_MTiRNFPepc_-nLxc3AnMwFK4yLOh91BMYX-FBzPkCSURDGvUod7d8lQ';
    const player = new Spotify.Player({
      name: 'Banter Bar',
      getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  };