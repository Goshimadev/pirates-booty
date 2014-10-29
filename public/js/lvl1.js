(function(){
  game.state.add('lvl1', {create:create, update:update, render:render});

  var map, layer, player, cursors;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#6686ff';

    map = game.add.tilemap('mario');
    map.addTilesetImage('worldfinal', 'tiles');
    map.setCollisionBetween(23, 44);

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    player = game.add.sprite(20, 200, 'hero');
    player.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
    player.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);
    player.animations.add('still', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.set(0.5, 0.5);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 250;
    player.body.setSize(32, 50, 0, 5);
    player.body.bounce.y = 0.3;
    player.body.linearDamping = 1;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    coins = game.add.group();
    coins.enableBody = true;
    for(var i = 0; i < 12; i++){
      var coin = coins.create(i * 100, 0, 'coin');
      coin.body.gravity.y = 400;
      coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      }
  }

  function update(){
    game.physics.arcade.collide(player, layer);
    player.body.velocity.x=0;
    game.physics.arcade.collide(coins, layer);

    if(cursors.left.isDown){
      player.body.velocity.x = -150;
      player.animations.play('left');
    }else if(cursors.right.isDown){
      player.body.velocity.x = 150;
      player.animations.play('right');
    }else{
      player.body.velocity.x = 0;
      player.animations.stop();
      player.frame = 130;
      // player.animations.play('still');
    }

    if(cursors.up.isDown && player.body.onFloor()){
      player.body.velocity.y = -350;
    }
  }

  function render(){
    game.debug.body(player);
    game.debug.body(layer);
  }

})();
