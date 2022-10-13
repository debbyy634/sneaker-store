import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Sneakers from "./components/marketplace/Sneakers";
import Cover from "./components/utils/Cover";
import "./App.css";

const App = function AppWrapper() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      <Notification />
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Sneakers />
          </main>
        </Container>
      ) : (
        <Cover name="Sneaker Store" login={login} coverImg="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/a8tvggzv1gmvzuftn3d4/sneaker-store?fimg-ssr-default" />
      )}
    </>
  );
};

export default App;
