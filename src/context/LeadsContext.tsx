import React, { createContext, useState, useContext, ReactNode } from "react";
import { Lead } from "../types/interfaces";

const dummyLeads: Lead[] = [
  {
    id: "1",
    fullName: "Annette Black",
    email: "annette.black@example.com",
    phone: "+1 555 123 4567",
    companyName: "Google",
    notes: "Interested in cloud services",
    created_at: "2023-01-12T10:00:00Z",
  },
  {
    id: "2",
    fullName: "Floyd Miles",
    email: "floyd.miles@example.com",
    phone: "+1 555 234 5678",
    companyName: "Yahoo",
    notes: "Follow up next week",
    created_at: "2023-02-04T14:30:00Z",
  },
  {
    id: "3",
    fullName: "Robert Fox",
    email: "robert.fox@example.com",
    phone: "+1 555 345 6789",
    companyName: "Microsoft",
    notes: "Needs demo of product",
    created_at: "2023-03-18T09:15:00Z",
  },
  {
    id: "4",
    fullName: "Darlene Robertson",
    email: "darlene.robertson@example.com",
    phone: "+1 555 456 7890",
    companyName: "Amazon",
    notes: "High priority lead",
    created_at: "2023-04-27T16:45:00Z",
  },
  {
    id: "5",
    fullName: "Marvin McKinney",
    email: "marvin.mckinney@example.com",
    phone: "+1 555 567 8901",
    companyName: "Flipkart",
    notes: "Requested pricing details",
    created_at: "2023-05-18T11:20:00Z",
  },
  {
    id: "6",
    fullName: "Bessie Cooper",
    email: "bessie.cooper@example.com",
    phone: "+1 555 678 9012",
    companyName: "Meta",
    notes: "Schedule meeting for next month",
    created_at: "2023-06-21T13:50:00Z",
  },
  {
    id: "7",
    fullName: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    phone: "+1 555 789 0123",
    companyName: "X",
    notes: "Interested in API integration",
    created_at: "2023-07-28T08:10:00Z",
  },
  {
    id: "8",
    fullName: "Darrell Steward",
    email: "darrell.steward@example.com",
    phone: "+1 555 890 1234",
    companyName: "YouTube",
    notes: "Needs more info on analytics",
    created_at: "2023-08-22T15:25:00Z",
  },
  {
    id: "9",
    fullName: "Jacob Jones",
    email: "jacob.jones@example.com",
    phone: "+1 555 901 2345",
    companyName: "Figma",
    notes: "Potential long-term client",
    created_at: "2023-09-13T12:00:00Z",
  },
];

interface LeadsContextType {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  deleteLeads: (leadIds: string[]) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [leads, setLeads] = useState<Lead[]>(dummyLeads);

  const addLead = (lead: Lead) => {
    setLeads((prev) => [...prev, lead]);
  };

  const deleteLeads = (leadIds: string[]) => {
    setLeads((prev) => prev.filter((lead) => !leadIds.includes(lead.id!)));
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, deleteLeads }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
};
