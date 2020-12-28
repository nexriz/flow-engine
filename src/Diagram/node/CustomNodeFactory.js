import * as React from 'react';
import { CustomNodeModel } from './CustomNodeModel';
import { CustomNodeWidget } from './CustomNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';



export class CustomNodeFactory extends AbstractReactFactory {
	constructor() {
		super('block');
	}

	generateModel(config) {

		return new CustomNodeModel(config.initialConfig);
	}

	generateReactWidget(event) {
		return <CustomNodeWidget engine={this.engine} node={event.model} />;
	}
}

