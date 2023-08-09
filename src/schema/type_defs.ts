export  const typeDefs = `
type Client {
  companyName: String
  gst: String
  id: ID! @id(autogenerate: true)
  companyImage: String
  orderedProject: Project @relationship(type: "ORDERED", direction: OUT)
  hasModuleticket: ModuleTicket @relationship(type: "HAS", direction: OUT)
  hasNotification: Notification @relationship(type: "HAS", direction: OUT)
  hasSupportticket: SupportTicket @relationship(type: "HAS", direction: OUT)
  adminApproved: Admin @relationship(type: "APPROVED", direction: IN)
  userIs: User @relationship(type: "IS", direction: IN)
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
}

type Admin {
  id: ID! @id(autogenerate: true)
  approvedClient: Client @relationship(type: "APPROVED", direction: OUT)
  approvedVendor: Vendor @relationship(type: "APPROVED", direction: OUT)
  createdProjectticket: ProjectTicket @relationship(type: "CREATED", direction: OUT)
  createdNotification: Notification @relationship(type: "CREATED", direction: OUT)
  createdInvoice: Invoice @relationship(type: "CREATED", direction: OUT)
  createdSupportticket: SupportTicket @relationship(type: "CREATED", direction: OUT)
  createdPage: Page @relationship(type: "CREATED", direction: OUT)
  hasProject: Project @relationship(type: "HAS", direction: OUT)
  userIs: User @relationship(type: "IS", direction: IN)
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
}

type Vendor {
  id: ID! @id(autogenerate: true)
  labName: String
  registration: String
  skills: [String]
  labImage: String
  adminApproved: Admin @relationship(type: "APPROVED", direction: IN)
  hasModuleticket: ModuleTicket @relationship(type: "HAS", direction: OUT)
  hasNotification: Notification @relationship(type: "HAS", direction: OUT)
  createdInvoice: Invoice @relationship(type: "CREATED", direction: OUT)
  hasSupportticket: SupportTicket @relationship(type: "HAS", direction: OUT)
  userIs: User @relationship(type: "IS", direction: IN)
}

type User {
  name: String
  email: String
  image: String
  bio: String
  id: ID! @id(autogenerate: true)
  address: String
  createdAt: DateTime
  isAdmin: Admin @relationship(type: "IS", direction: OUT)
  isVendor: Vendor @relationship(type: "IS", direction: OUT)
  isClient: Client @relationship(type: "IS", direction: OUT)
}

type Project {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  companyName: String
  email: String
  address: String
  country: String
  city: String
  gst: String
  createdAt: DateTime
  status: Status @default(value: PENDING)
  clientOrdered: Client @relationship(type: "ORDERED", direction: IN)
  adminHas: Admin @relationship(type: "HAS", direction: IN)
  hasModule: [Module!]!  @relationship(type: "HAS", direction: OUT)
  projectticketFor: ProjectTicket @relationship(type: "FOR", direction: IN)
}

enum Status {
  PENDING
  APPROVED
  ASSIGNED
  COMPLETED
  CANCELLED
}

type Documents {
  id: ID! @id(autogenerate: true)
  hasImages: Images @relationship(type: "HAS", direction: OUT)
  hasFiles: Files @relationship(type: "HAS", direction: OUT)
  moduleHas: Module @relationship(type: "HAS", direction: IN)
}

type Images {
  id: ID! @id(autogenerate: true)
  links: [String]
  documentsHas: Documents @relationship(type: "HAS", direction: IN)
}

type Files {
  id: ID! @id(autogenerate: true)
  links: [String]
  documentsHas: Documents @relationship(type: "HAS", direction: IN)
}

type ProjectTicket {
  projectTicket: String @default(value: "Not Available") 
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  hasModuleticket: ModuleTicket @relationship(type: "HAS", direction: OUT)
  forProject: Project @relationship(type: "FOR", direction: OUT)
}

type ModuleTicket {
  id: ID! @id(autogenerate: true)
  clientHas: Client @relationship(type: "HAS", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
  projectticketHas: ProjectTicket @relationship(type: "HAS", direction: IN)
  forModule: Module @relationship(type: "FOR", direction: OUT)
}

type Notification {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  image: String
  clientHas: Client @relationship(type: "HAS", direction: IN)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
}

type Invoice {
  id: ID! @id(autogenerate: true)
  clientName: String
  clientAddress: String
  clientEmail: String
  price: Int
  tax: Int
  totalPrice: Int
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorCreated: Vendor @relationship(type: "CREATED", direction: IN)
  hasClient: Client @relationship(type: "HAS", direction: OUT)
  hasAdmin: Admin @relationship(type: "HAS", direction: OUT)
}

type SupportTicket {
  id: ID! @id(autogenerate: true)
  clientHas: Client @relationship(type: "HAS", direction: IN)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
}

type Module {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  projectHas: Project @relationship(type: "HAS", direction: IN)
  moduleticketFor: ModuleTicket @relationship(type: "FOR", direction: IN)
  hasDocuments: Documents @relationship(type: "HAS", direction: OUT)
}

type Page {
  id: ID! @id(autogenerate: true)
  image: String
  title: String
  subtitle: String
  description: String
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
}





`;


