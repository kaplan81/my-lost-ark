<?php
/**
 * Implements hook_rules_action_info()
 */
function my_module_rules_action_info() {
  // We register our action.
  // Then we should select the "After cloning a node" event on the Rules control panel.
  // No conditions to this event, just this action:
  return array(
    'my_module_rules_action_clone_node_access_control_settings' => array(
      'label' => t('Clone node access control settings'),
      'group' => t('Custom'),
      'parameter' => array(
        'cloned_node' => array(
          'type' => 'node',
          'label' => t('Cloned node')
        ),
        'original_node' => array(
          'type' => 'node',
          'label' => t('Original node')
        )
      ) 
    )
  );
}

function my_module_rules_action_clone_node_access_control_settings($cloned_node, $original_node) {
  drupal_set_message(t('Your content has been successfully cloned and stored in the database. Please edit it and save it in order publish it.'));
  clone_node_role_access_settings($original_node, $cloned_node);
  // We unpublish our just cloned node so it is not shown undesirely on our site.
  $cloned_node->status = 0;
  node_save($cloned_node);
}

function clone_node_role_access_settings($original_node, $cloned_node) {
  // Not all the nodes possess these settings.
  // The ones that are not referenced on the content_access table just get the default global access control settings
  foreach (db_query("SELECT settings FROM {content_access} WHERE nid = :nid", array(':nid' => $original_node->nid)) as $record) {
    $settings = $record->settings;
  }
  if($settings) {
    db_insert('content_access')
       ->fields(array(
       'nid' => $cloned_node->nid,
       'settings' => $settings
       ))
       ->execute();
  }
}

