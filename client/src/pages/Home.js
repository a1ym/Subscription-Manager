import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionChart from '../components/SubscriptionChart';

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [listOfSubscriptions, setListOfSubscriptions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/subscriptions").then((response) => {
      setListOfSubscriptions(response.data);
    });
  }, []);
  const fetchSubscriptions = () => {
    axios.get("http://localhost:3001/subscriptions")
      .then((response) => {
        setListOfSubscriptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subscriptions:', error);
      });
  };
  
  // Update your useEffect to use this new function
  useEffect(() => {
    fetchSubscriptions();
  }, []);
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/subscriptions/${id}`)
        .then(() => {
            // Update the state to remove the deleted item
            setListOfSubscriptions(currentSubscriptions => 
                currentSubscriptions.filter(subscription => subscription.id !== id)
            );
        })
        .catch((error) => {
            console.error('Error deleting subscription:', error);
        });
};
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newSubscription = {
      service: event.target.service.value,
      description: event.target.description.value,
      monthlyCost: event.target.monthlyCost.value,
      // You might want to handle dates differently
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  


    // Send a POST request to the server
    axios.post("http://localhost:3001/subscriptions", newSubscription)
      .then((response) => {
        // Handle success
        console.log(response);
        setShowForm(false); // Hide form after successful submission
        // Fetch the updated list of subscriptions
        fetchSubscriptions();
      })
      .catch((error) => {
        // Handle error
        console.error('Error posting new subscription:', error);
      });
  };
  

  return (
    <div className="content-container">
        <div className="subscription-list">
            <div id="subscription-container">
                {listOfSubscriptions.map((subscription) => {
                    return (
                        <div className="subscription-item" key={subscription.id}>
                            <button className="delete-button" onClick={() => handleDelete(subscription.id)}>X</button>
                            <div className="subscription-title">{subscription.service}</div>
                            <div className="subscription-description">{subscription.description}</div>
                            <div className="subscription-cost">${subscription.monthlyCost} per month</div>
                            <div className="subscription-date">Subscribed on: {new Date(subscription.createdAt).toLocaleDateString()}</div>
                        </div>
                    );
                })}
            </div>
            <div>
                <button className="add-subscription-btn" onClick={() => setShowForm(true)}>+</button>
            </div>
            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="service" placeholder="Service Name" required />
                    <input type="text" name="description" placeholder="Description" />

                    <div className="input-group">
                        <span className="input-group-addon">$</span>
                        <input type="text" name="monthlyCost" placeholder="Monthly Cost" pattern="^\d*(\.\d{0,2})?$" title="Please enter a valid price (up to two decimal places)" required />
                    </div>

                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}
        </div>

        <div className="chart-container">
            <SubscriptionChart subscriptions={listOfSubscriptions} />
        </div>
    </div>
);

}

export default Home;
