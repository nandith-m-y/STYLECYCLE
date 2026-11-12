import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useExchange } from "../context/ExchangeContext";
import { ExchangeCard } from "../components/exchange/ExchangeCard";
import { EmptyState } from "../components/common/EmptyState";
import { ArrowLeftRight, RefreshCw, Inbox, Send, CheckCircle2 } from "lucide-react";

export const ExchangeManagementPage = () => {
  const { 
    exchanges, 
    incomingRequests, 
    outgoingRequests, 
    acceptExchange, 
    rejectExchange, 
    cancelExchange 
  } = useExchange();

  const [activeTab, setActiveTab] = useState("incoming"); // incoming, outgoing, accepted

  const acceptedExchanges = exchanges.filter(e => e.status === "Accepted");

  const currentDisplayList = 
    activeTab === "incoming" ? incomingRequests :
    activeTab === "outgoing" ? outgoingRequests :
    acceptedExchanges;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Circular Operations</span>
          <h1 className="font-serif text-3xl font-bold text-dark mt-1">Exchange Management</h1>
          <p className="text-xs text-dark-muted mt-1">Review incoming offers, track outgoing swap proposals and finalized agreements.</p>
        </div>

        <Link
          to="/exchange"
          className="luxury-btn luxury-btn-primary px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 self-start sm:self-auto"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Explore Exchange Marketplace
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("incoming")}
          className={`pb-3 flex items-center gap-1.5 transition-colors ${
            activeTab === "incoming" ? "border-b-2 border-primary text-primary" : "text-dark-muted hover:text-dark"
          }`}
        >
          <Inbox className="w-4 h-4" />
          Incoming Offers ({incomingRequests.length})
        </button>

        <button
          onClick={() => setActiveTab("outgoing")}
          className={`pb-3 flex items-center gap-1.5 transition-colors ${
            activeTab === "outgoing" ? "border-b-2 border-primary text-primary" : "text-dark-muted hover:text-dark"
          }`}
        >
          <Send className="w-4 h-4" />
          Outgoing Proposals ({outgoingRequests.length})
        </button>

        <button
          onClick={() => setActiveTab("accepted")}
          className={`pb-3 flex items-center gap-1.5 transition-colors ${
            activeTab === "accepted" ? "border-b-2 border-primary text-primary" : "text-dark-muted hover:text-dark"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Finalized Exchanges ({acceptedExchanges.length})
        </button>
      </div>

      {/* Exchange List */}
      {currentDisplayList.length === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title={`No ${activeTab} Exchange Requests`}
          description={
            activeTab === "incoming" 
              ? "You do not have any pending incoming exchange offers right now."
              : activeTab === "outgoing"
              ? "You haven't submitted any outgoing exchange proposals yet."
              : "No accepted exchanges yet."
          }
          actionText="Browse Exchange Items"
          actionLink="/exchange"
        />
      ) : (
        <div className="space-y-4">
          {currentDisplayList.map((item) => (
            <ExchangeCard
              key={item.id}
              exchange={item}
              onAccept={acceptExchange}
              onReject={rejectExchange}
              onCancel={cancelExchange}
            />
          ))}
        </div>
      )}

    </div>
  );
};
