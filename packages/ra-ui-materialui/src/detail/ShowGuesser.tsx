import * as React from 'react';
import { useEffect, useState } from 'react';
import inflection from 'inflection';
import {
    useShowController,
    InferredElement,
    getElementsFromRecords,
    ShowContextProvider,
} from 'ra-core';

import { ShowView, ShowViewProps } from './ShowView';
import showFieldTypes from './showFieldTypes';
import { ShowProps } from '../types';

const ShowViewGuesser = (props: ShowViewProps) => {
    const { record, resource } = props;
    const [inferredChild, setInferredChild] = useState(null);
    useEffect(() => {
        if (record && !inferredChild) {
            const inferredElements = getElementsFromRecords(
                [record],
                showFieldTypes
            );
            const inferredChild = new InferredElement(
                showFieldTypes.show,
                null,
                inferredElements
            );

            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log(
                    `Guessed Show:

export const ${inflection.capitalize(
                        inflection.singularize(resource)
                    )}Show = props => (
    <Show {...props}>
${inferredChild.getRepresentation()}
    </Show>
);`
                );
            setInferredChild(inferredChild.getElement());
        }
    }, [record, inferredChild, resource]);

    return <ShowView {...props}>{inferredChild}</ShowView>;
};

ShowViewGuesser.propTypes = ShowView.propTypes;

const ShowGuesser = (props: ShowProps) => {
    const controllerProps = useShowController(props);
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowViewGuesser {...props} {...controllerProps} />
        </ShowContextProvider>
    );
};

export default ShowGuesser;
