import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddSneaker from "./AddSneaker";
import Sneaker from "./Sneaker";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getSneakers as getSneakerList,
  buySneaker,
  createSneaker,
  addSneakers,
  oneStarRating,
  twoStarRating,
  threeStarRating
} from "../../utils/marketplace";


const Sneakers = () => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);

  const account = window.walletConnection.account();

  
  const getSneakers = async () => {
    try {
      setLoading(true);
      setSneakers(await getSneakerList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const addSneaker = async (data) => {
    setLoading(true);

    try {
      await createSneaker(data).then((resp) => {
        toast(<NotificationSuccess text="Sneaker added successfully." />);
        getSneakers();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add sneaker" />);
    } finally {
      setLoading(false);
    }
  };



  const addmoreSneakers = async (id, _ammount) => {
    setLoading(true);
    try {
      await addSneakers(id).then((resp) => {
        toast(<NotificationSuccess text="sneakers ended successfully." />);
        getSneakers();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add more sneakers" />);
    } finally {
      setLoading(false);
    }
  };

  const onestar = async (id) => {
    setLoading(true);

    try {
      await oneStarRating(id).then((resp) => {
        toast(<NotificationSuccess text="one star ratting successfull." />);
        getSneakers();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to rate" />);
    } finally {
      setLoading(false);
    }
  };

  const twostar = async (id) => {
    setLoading(true);

    try {
      await twoStarRating(id).then((resp) => {
        toast(<NotificationSuccess text="two star ratting successfull." />);
        getSneakers();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to rate" />);
    } finally {
      setLoading(false);
    }
  };


  
  const threestar = async (id) => {
    setLoading(true);

    try {
      await threeStarRating(id).then((resp) => {
        toast(<NotificationSuccess text="three star ratting successfull." />);
        getSneakers();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to rate" />);
    } finally {
      setLoading(false);
    }
  };


  const buy = async (id, price) => {
    try {
      await buySneaker({
        id,
        price,
      }).then((resp) =>{
        toast(<NotificationSuccess text="Sneaker bought successfully" />);
        getSneakers()
      });
    } catch (error) {
      toast(<NotificationError text="Failed to buy sneakers ." />);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getSneakers();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Sneaker Store</h1>
            <AddSneaker save={addSneaker} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {sneakers.map((_sneaker) => (
              <Sneaker
                sneaker={{
                  ..._sneaker,
                }}
                key={_sneaker.id}
                buy={buy}
                addmoreSneakers={addmoreSneakers}
                onestar={onestar}
                twostar={twostar}
                threestar={threestar}
              
                isOwner = {account.accountId === _sneaker.owner}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Sneakers;
