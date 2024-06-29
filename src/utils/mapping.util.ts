export mapConfigDataToFillInBlanksItems(
    configData: ConfigData,
  ): FillInBlankItem[] {
    return configData.formDataFillInTheBlanks.data.map((data) => {
      if (!data.formDataPointer) {
        return data as TextItem;
      }

      return {
        ...data,
        ...configData.formData[data.formDataPointer],
        nodes: this.mapNodes(configData.formData, data.nodes),
      } as FillInBlankItem;
    });
  }

  private mapNodes(
    formData: Record<string, ConfigFormDataOption>,
    nodes?: ConfigNode[],
  ): FillInBlankItemNode[] | undefined {
    if (!nodes) return undefined;

    return nodes.map((node) => {
      const children = node.children.map((child) => {
        const fillInBlankItemChild = {
          ...child,
          nodes: this.mapNodes(formData, child.nodes),
        };

        if (!child.formDataPointer) {
          return fillInBlankItemChild;
        }

        return {
          ...fillInBlankItemChild,
          ...formData[child.formDataPointer],
        };
      });

      return { children, filter: node.filter };
    }) as FillInBlankItemNode[];
  }