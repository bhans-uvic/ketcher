/****************************************************************************
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import React from 'react'
import styles from './TypeChoice.module.less'

const typeSchema = [
  { title: 'Single', value: 'atom' },
  { title: 'List', value: 'list' },
  { title: 'Not List', value: 'not-list' }
]

function TypeChoice({ value, onChange, ...props }) {
  return (
    <fieldset className={styles.fieldset}>
      {typeSchema.map(sc => (
        <label key={sc.title}>
          <input
            type="radio"
            value={sc.value}
            checked={sc.value === value} //TODO: fix React Warning
            onClick={() => onChange(sc.value)}
            {...props}
          />
          {sc.title}
        </label>
      ))}
    </fieldset>
  )
}

export default TypeChoice
