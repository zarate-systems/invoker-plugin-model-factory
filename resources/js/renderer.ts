export default (context: PluginContext) => {
  context.modelContextMenu.add({
    item: {
      label: 'Run factory',
      click: (selectedEntries, modelDefinition) => {
        invoker.showConfirmation({
          title: 'Generate new model',
          text: `Do you want generate new model for ${modelDefinition.model.class}?`,
          onConfirm: async () => {
            await invoker.evaluate(`
              $version = \\Illuminate\\Foundation\\Application::VERSION;

              $version < '8.0.0' ? factory(${modelDefinition.model.class}::class)->create()
              : ${modelDefinition.model.class}::factory()->create(); 
            `)

            invoker.showNotification({
              title: 'New Model Generated',
              text: `Successfully genareted model!`,
              type: 'success'
            })
          },
          confirmButtonText: 'Generate',
        })
      }
    },
    isVisible: (selectedEntries, modelDefinition) => {
      return true;
    }
  });
}