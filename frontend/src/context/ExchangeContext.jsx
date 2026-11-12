import React, { createContext, useContext, useState, useEffect } from "react";
import { exchangeService } from "../services/exchangeService";

const ExchangeContext = createContext();

export const ExchangeProvider = ({ children }) => {
  const [exchanges, setExchanges] = useState(() => exchangeService.getExchanges());

  const sendExchangeRequest = (payload) => {
    const created = exchangeService.createExchangeRequest(payload);
    setExchanges((prev) => [created, ...prev]);
    return created;
  };

  const acceptExchange = (id) => {
    const updated = exchangeService.updateStatus(id, "Accepted");
    setExchanges([...updated]);
  };

  const rejectExchange = (id) => {
    const updated = exchangeService.updateStatus(id, "Rejected");
    setExchanges([...updated]);
  };

  const cancelExchange = (id) => {
    const updated = exchangeService.updateStatus(id, "Cancelled");
    setExchanges([...updated]);
  };

  const incomingRequests = exchanges.filter(e => e.type === "incoming");
  const outgoingRequests = exchanges.filter(e => e.type === "outgoing");
  const activeExchanges = exchanges.filter(e => e.status === "Pending" || e.status === "Accepted");

  return (
    <ExchangeContext.Provider
      value={{
        exchanges,
        incomingRequests,
        outgoingRequests,
        activeExchanges,
        sendExchangeRequest,
        acceptExchange,
        rejectExchange,
        cancelExchange
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => useContext(ExchangeContext);
