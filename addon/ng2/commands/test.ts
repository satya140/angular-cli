import * as TestCommand from 'ember-cli/lib/commands/test';
import * as TestTask from '../tasks/test';
import {CliConfig} from '../models/config';

module.exports = TestCommand.extend({
  availableOptions: [
    { name: 'watch', type: Boolean, default: true, aliases: ['w'] },
    { name: 'browsers', type: String },
    { name: 'colors', type: Boolean },
    { name: 'log-level', type: String },
    { name: 'port', type: Number },
    { name: 'reporters', type: String },
    { name: 'build', type: Boolean, default: true }
  ],

  run: function (commandOptions) {
    this.project.ngConfig = this.project.ngConfig || CliConfig.fromProject();

    const testTask = new TestTask({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    if (!commandOptions.watch) {
      // if not watching ensure karma is doing a single run
      commandOptions.singleRun = true;
    }
    return testTask.run(commandOptions);
  }
});

module.exports.overrideCore = true;
