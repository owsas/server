var test = require('tape');
var ChatChannel = require('../lib/chat_channel');
var Scene = require('../elements/scene');

test('should create', function (t) {
  t.plan(1);

  var c = new ChatChannel();
  t.ok(c instanceof ChatChannel);
});

test('should send message', function (t) {
  t.plan(2);

  var c = new ChatChannel({
    scene: new Scene('scene')
  });

  var xml = c.sendMessage({
    broadcast: function () {},
    player: { name: 'ben', uuid: '1234...' }
  }, 'hello world');

  t.ok(/^<event.+chat/.test(xml));
  t.ok(/uuid=.1234/.test(xml));
});

test('should send message from scene', function (t) {
  t.plan(2);

  var s = new Scene('scene');
  var c = new ChatChannel({
    scene: s,
    emit: function () {}
  });

  var xml = c.sendMessage(s, 'debug log');

  t.ok(/^<event.+chat/.test(xml));
  t.ok(!(/uuid=.1234/.test(xml)));
});
