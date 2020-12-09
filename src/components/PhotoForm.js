import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import "./PhotoForm.css";
import { getPhotos, addPhoto, editPhoto } from "../utils/requests";
import { observer } from "mobx-react";
import history from '../src/history'
const schema = yup.object({
    sub_id: yup.string().required("Sub_Id is required"),
});
function PhotoForm({ photosStore, edit, selectedPhoto, onSave }) {
    const fileUpload = React.createRef();
    const [file, setPhoto] = useState(null);
    const [fileName, setFileName] = useState("");
    const getAllPhotos = async () => {
        const response = await getPhotos();
        photosStore.setPhotos(response.data);
    };
    const handleSubmit = async evt => {
        const isValid = await schema.validate(evt);
        if (!isValid) {
            return;
        }
        try {
            let bodyFormData = new FormData();
            if (!edit) {
                bodyFormData.set("sub_id", evt.sub_id);
                bodyFormData.append("file", file);
                await addPhoto(bodyFormData);
                history.push('/')
            } else {
                bodyFormData.set("id", selectedPhoto.id);
                bodyFormData.set("sub_id", evt.sub_id);
                if (file) {
                    bodyFormData.append("file", file);
                }
                await editPhoto(bodyFormData);
            }
        } catch (error) {
            alert("Upload must be an image");
        }
        await getAllPhotos();
        onSave();
    };
    const setFile = evt => {
        setPhoto(evt.target.files[0]);
        setFileName(evt.target.files[0].sub_id);
    };
    const openUploadDialog = () => {
        fileUpload.current.click();
    };
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={edit ? selectedPhoto : {}}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    isInvalid,
                    errors
                }) => (
                        <div className="container">
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12" controlId="sub_id">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="sub_id"
                                            placeholder="Name"
                                            value={values.sub_id || ""}
                                            onChange={handleChange}
                                            isInvalid={touched.name && errors.sub_id}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.sub_id}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="12" controlId="photo">
                                        <input
                                            type="file"
                                            ref={fileUpload}
                                            name="file"
                                            style={{ display: "none" }}
                                            onChange={setFile}
                                        />
                                        <div className="file-box">
                                            <Button type="button" onClick={openUploadDialog}>
                                                Upload Photo
                  </Button>
                                            <span style={{ paddingLeft: "10px", marginTop: "5px" }}>
                                                {fileName}
                                            </span>
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Button type="submit" style={{ marginRight: "10px" }}>
                                    Save
            </Button>
                            </Form>
                        </div>
                    )}
            </Formik>
        </div>
    );
}
export default observer(PhotoForm);