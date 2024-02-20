import React from "react";
// components
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
// styles
import styles from "./styles/ActionsDropdown.module.css";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    
    <FontAwesomeIcon
        icon={faEllipsisVertical}
        size='xl'
        className={styles.ThreeDots}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />

));

export const ActionsDropdown = (props) => {

    const { handleDelete, handleEdit, data } = props;

    return (
        <Dropdown className="" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className={styles.Dropdown}
                popperConfig={{ strategy: "fixed" }}
            >
                <div>
                    <Dropdown.Item
                        className={styles.DropdownItem}
                        onClick={() => handleEdit(data)}
                        aria-label="edit"
                    >
                        <FontAwesomeIcon icon={faEdit} size='xl' />
                    </Dropdown.Item>
                    <Dropdown.Item
                        className={styles.DropdownItem}
                        onClick={() => handleDelete(data)}
                        aria-label="delete"
                    >
                        <FontAwesomeIcon icon={faTrashCan} size='xl' />
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};