import * as React from 'react';
import PropTypes from 'prop-types';
import {
    ShowContextProvider,
    useCheckMinimumRequiredProps,
    useShowController,
} from 'ra-core';

import { ShowProps } from '../types';
import { ShowView } from './ShowView';

/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The <Show> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import * as React from "react";
 * import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 * export const PostShow = (props) => (
 *     <Show {...props}>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </Show>
 * );
 *
 * // in src/App.js
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostShow } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" show={PostShow} />
 *     </Admin>
 * );
 * export default App;
 */
export const Show = (props: ShowProps) => {
    useCheckMinimumRequiredProps('Show', ['children'], props);
    const controllerProps = useShowController(props);
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView {...props} {...controllerProps} />
        </ShowContextProvider>
    );
};

Show.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    id: PropTypes.any.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.node,
};
