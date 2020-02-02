import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

fontawesome.library.add(fas, fab, far);

/**
 * Render Font Awesome icons
 * 
 * @see See [FontAwesome](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use) 
 * 
 * @example
 *  <FontAwesome icon="square" color="green" />
 *  <FontAwesome icon="check" inverse transform="shrink-6" />
 */

export default function FontAwesome(props) {
  return (
    <FontAwesomeIcon  {...props} />
  );
};
