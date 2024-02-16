import "./editcomment.css";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_comment_thunk } from "../../../redux/comments";
import { useModal } from "../../../context/Modal";

const EditComment = ({photoId, comment}) => {
    const dispatch = useDispatch();
    
}
