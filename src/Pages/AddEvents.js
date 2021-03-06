import React, { useState,useEffect } from "react";
import AuthService from "../Services/Auth/auth.service";
import EventsDataService  from "../Services/EventsService";
import {Link, useNavigate} from 'react-router-dom';
import Button from '../ReUsables/Button'


const AddEvent  = () => {
  let navigate = useNavigate();

  const initialEventState = {
    // id: null,
    title: "",
    details: "",
    date: "",
    // status: ""
  };
  const [event, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    } else {
         return
    }

}, []);

  const handleInputChange = input => {
    const { name, value } = input.target;
    setEvent({ ...event, [name]: value });
  };

  const saveEvent = () => {
    var data = {
      title: event.title,
      details: event.details,
      date: event.date,
      // status: event.status

    };

    EventsDataService.create(data)
      .then(response => {
        setEvent({
          // id: response.data.id,
          title: response.data.title,
          details: response.data.details,
          date: response.data.date,
          // status: response.data.status
        });
        setSubmitted(true);
        console.log( "addevent",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEvent = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };

   return (
    <div className="submit-form">
      {submitted ? (
        <div>
                  <h4>You submitted successfully!</h4>
                  

        <div className="d-flex justify-content-between">
          <Button
              size='btn-sm'
              textcolor='white'
              color='btn-warning'
               text="Add Event"
               onClick={newEvent} />
          <Link to={'/events'} className="btn btn-warning btn-sm float-end">Events</Link>

        </div></div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={event.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className="form-control"
              id="details"
              required
              value={event.details}
              onChange={handleInputChange}
              name="details"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={event.date}
              onChange={handleInputChange}
              name="date"
            />
          </div>
          {/*<div className="form-group">
            <label htmlFor="date">Status</label>
            <input
              type="status"
              className="form-control"
              id="status"
              required
              value={event.status}
              onChange={handleInputChange}
              name="status"
            />
      </div>*/}
<div className="d-flex justify-content-between">
<Button
              size='btn-sm'
              textcolor='white'
              color='btn-warning'
               text="Submit"
               onClick={saveEvent} />
                         <Link to={'/events'} className="btn btn-warning btn-sm float-end">Events</Link>
</div>
        </div>
      )}
    </div>
  );
};

export default AddEvent
  