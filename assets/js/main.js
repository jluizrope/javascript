var largura = window.innerWidth
var altura = window.innerHeight

var config = {
  type: Phaser.AUTO,
    width: largura,
    height: altura,
    pixelArt: true,
    backgroundColor: '#17c658',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
  }
};
function preload () {
	console.log('1')
	this.load.atlas(
    'hamtaro',
    'assets/sprites/hamham.png',
    'assets/sprites/hamtaro.json'
  )
};
function create () {
	console.log('2')
	ceu = this.add.image(400, 300,'sky')
	piso = this.physics.add.staticGroup();
  	piso.create(0, 968, 'ground').setScale(3).refreshBody();
  	piso.create(700, 400, 'ground');
   	personagem = this.physics.add.sprite(400, 400, 'hamtaro')
   	estrelas = this.physics.add.group({
    key: 'star',
    repeat: 20,
    setXY: { x: 30, y: 0, stepX: 75 }
  });
   	titulo = this.add.text(100, 50, 'Hamtarooo!', { 
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  })
   cursors = this.input.keyboard.createCursorKeys();
   	this.physics.add.collider(personagem, piso);
  	this.physics.add.collider(estrelas, piso);
  	this.anims.create({ 
    key: 'esquerda', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 4,
        end: 6            
    }),
    repeat: -1,
    duration: 300
  });
  	this.physics.add.overlap(
      personagem,
      estrelas,
      pegarEstrela,
      null,
      this
  );
};

function update (){
	if (cursors.left.isDown) {
    personagem.setVelocityX(-160);	
	}
  	else if (cursors.right.isDown) {
    personagem.setVelocityX(160);
  	}
  	else if (cursors.up.isDown && personagem.body.touching.down) {
    personagem.setVelocityY(-460);
  	}
  	else {
    personagem.setVelocityX(0);
  	}
}
function pegarEstrela (personagem, star) {
  star.disableBody(true, true);
}
var game = new Phaser.Game(config);