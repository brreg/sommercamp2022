import { React, useState } from 'react'
import data from "./smb.json"

function List(props) {
    return (
        <ul>
            {data.map((item) => (
                <li key={item.org_number}>{item.org_name}</li>
            ))}
        </ul>
    )
}

export default List