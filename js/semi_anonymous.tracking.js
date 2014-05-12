/**
 * @file
 * Track browsing history or other logging stats.
 */

// Those functions in need of a little jQuery.
(function ($) {

    // Access records of group, which are counted and grouped by distict values.
    Drupal.behaviors.semi_anonymous.get_activities_distinct_grouped_count = function(group, distinct) {
        var results = Drupal.behaviors.semi_anonymous.get_activities(group);
        if (type == false) {
            $.each($.jStorage.index(), function(key, r) {
                // Provide the count.
                var value = $.jStorage.get(key);
                if (value == distinct) {
                    results[r].count++;
                }
            });
            return results;
        }
        else {
            return results;
        }
    }

    // Access records of a specific group.
    Drupal.behaviors.semi_anonymous.get_activities = function(group) {
        var results = $.jStorage.index();

        if (group != false) {
            $.each(results, function (i, r) {
                // Remove unwanted types.
                if (!i.indexOf(group)) {
                    unset(results[i]);
                }
            });
            return results;
        }
        else {
            return results;
        }
    }

    // Act on the page load.
    $(document).ready(function () {

        // Log page visit.
        if (Drupal.settings.semi_anonymous.track_browsing) {
            Drupal.behaviors.semi_anonymous.create_record('track_browse', uri);
        }

        // Log term hit.
        if (Drupal.settings.semi_anonymous.track_term_hits) {
            $each(Drupal.settings.semi_anonymous.taxonomy, function () {
                Drupal.behaviors.semi_anonymous.create_record('track_term', $(this));
            });
        }
    });

})(jQuery);

// Put things in.
// @todo Could allow TTL as an optional parameter.
Drupal.behaviors.semi_anonymous.create_record = function(group, data) {
    // Place in storage.
    var n = new Date().getTime();
    // Log event.
    $.jStorage.set(group + '--' + n, data)
}