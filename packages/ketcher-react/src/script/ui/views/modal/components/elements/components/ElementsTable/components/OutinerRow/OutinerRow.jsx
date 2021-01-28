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
import Atom from '../../../../../../../../component/view/Atom/Atom'
import clsx from 'clsx'

import styles from './OutinerRow.module.less'

function OutinerRow({
  row,
  caption,
  selected,
  onSelect,
  currentEvents,
  atomClasses
}) {
  return (
    <tbody className={styles.body}>
      <tr className={styles.row}>
        <th colSpan="3" className={styles.ref}>
          {caption}
        </th>
        {row.map(el => (
          <td className={styles.cell} key={el.label}>
            <Atom
              el={el}
              className={clsx(
                {
                  [styles.selected]: selected(el.label)
                },
                ...atomClasses(el)
              )}
              onClick={() => onSelect(el.label)}
              {...currentEvents(el)}
            />
          </td>
        ))}
        <td />
      </tr>
    </tbody>
  )
}

export default OutinerRow
