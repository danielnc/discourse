/**
  This controller supports actions when listing topics or categories

  @class ListTopicsController
  @extends Discourse.ObjectController
  @namespace Discourse
  @module Discourse
**/
Discourse.ListTopicsController = Discourse.ObjectController.extend({
  needs: ['list', 'composer', 'modal'],
  rankDetailsVisible: false,

  // If we're changing our channel
  previousChannel: null,

  latest: Ember.computed.equal('content.filter', 'latest'),

  draftLoaded: function() {
    var draft = this.get('content.draft');
    if (draft) {
      return this.get('controllers.composer').open({
        draft: draft,
        draftKey: this.get('content.draft_key'),
        draftSequence: this.get('content.draft_sequence'),
        ignoreIfChanged: true
      });
    }
  }.observes('content.draft'),

  // Star a topic
  toggleStar: function(topic) {
    topic.toggleStar();
  },

  // clear a pinned topic
  clearPin: function(topic) {
    topic.clearPin();
  },

  toggleRankDetails: function() {
    this.toggleProperty('rankDetailsVisible');
  },

  // Show rank details
  showRankDetails: function(topic) {
    var modalController = this.get('controllers.modal');
    if (modalController) {
      modalController.show(Discourse.TopicRankDetailsView.create({ topic: topic }));
    }
  },

  createTopic: function() {
    this.get('controllers.list').createTopic();
  },

  // Show newly inserted topics
  showInserted: function(e) {
    var tracker = Discourse.get('currentUser.userTrackingState');

    // Move inserted into topics
    this.get('content').loadBefore(tracker.get('newIncoming'));
    tracker.resetTracking();
    return false;
  }
});


