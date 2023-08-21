export  const typeDefs = `


enum UserType  {
  ADMIN
  SERVICE_PROVIDER
  CONSUMER
}

enum Status {
  CREATED
  PENDING
  ACCEPTED
  APPROVED
  ASSIGNED
  COMPLETED
  COMPLAINED
  REJECTED
}

enum SampleStatus {
  NOT_SENT
  RECEIVED
  ON_WAY
}

enum InvoiceStatus {
  SENT
  COMPLAINED
}




type Client {
  id: ID! @id(autogenerate: true)
  sub_type: String
  orderedProject: Project @relationship(type: "ORDERED", direction: OUT)
  hasModuleticket: ModuleTicket @relationship(type: "HAS", direction: OUT)
  hasNotification: Notification @relationship(type: "HAS", direction: OUT)
  hasSupportticket: SupportTicket @relationship(type: "HAS", direction: OUT)
  adminApproved: Admin @relationship(type: "APPROVED", direction: IN)
  userIs: User @relationship(type: "IS", direction: IN)
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
  hasLeads: Leads @relationship(type: "HAS", direction: OUT)
  communicationticketFor: CommunicationTicket @relationship(type: "FOR", direction: IN)
  hasReply: Reply @relationship(type: "HAS", direction: OUT)
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
  hasLeads: Leads @relationship(type: "HAS", direction: OUT)
  createdCommunicationticket: CommunicationTicket @relationship(type: "CREATED", direction: OUT)
}

type Vendor {
  id: ID! @id(autogenerate: true)
  industry: [String]
  sub_type: String
  labImage: String
  adminApproved: Admin @relationship(type: "APPROVED", direction: IN)
  hasModuleticket: ModuleTicket @relationship(type: "HAS", direction: OUT)
  hasNotification: Notification @relationship(type: "HAS", direction: OUT)
  createdInvoice: Invoice @relationship(type: "CREATED", direction: OUT)
  hasSupportticket: SupportTicket @relationship(type: "HAS", direction: OUT)
  userIs: User @relationship(type: "IS", direction: IN)
  hasLeads: Leads @relationship(type: "HAS", direction: OUT)
  communicationticketFor: CommunicationTicket @relationship(type: "FOR", direction: IN)
  hasReply: Reply @relationship(type: "HAS", direction: OUT)
}

type User {
  name: String
  email: String
  image: String
  bio: String
  id: ID @id(autogenerate: true)
  address: String
  city: String
  state: String
  zip: String
  createdAt: DateTime
  companyName: String
  companyEmail: String
  status: Status @default(value: PENDING)
  user_type: UserType
  gstNumber: String
  isAdmin: Admin @relationship(type: "IS", direction: OUT)
  isVendor: Vendor @relationship(type: "IS", direction: OUT)
  isClient: Client @relationship(type: "IS", direction: OUT)
  hasDocuments: Documents @relationship(type: "HAS", direction: OUT)
  hasModuleticket: ModuleTicket @relationship(type: "Has", direction: OUT)
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



type Documents {
  id: String
  userHas: User @relationship(type: "HAS", direction: IN)
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
  ticket: String! @default(value: "Not Available")
  status: Status @default(value: PENDING)
  complain: String
  reports: [String]
  clientHas: Client @relationship(type: "HAS", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
  projectticketHas: ProjectTicket @relationship(type: "HAS", direction: IN)
  forModule: Module @relationship(type: "FOR", direction: OUT)
  userHas: User @relationship(type: "Has", direction: IN)
}

type Notification {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  image: String
  type: String
  createdAt: DateTime
  clientHas: Client @relationship(type: "HAS", direction: IN)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
}

type Invoice {
  id: ID! @id(autogenerate: true)
  clientName: String
  clientAddress: String
  clientEmail: String
  totalPrice: Int
  createdAt: DateTime
  priceWithTax: Int
  complain: String
  taxRate: Int
  status: InvoiceStatus @default(value: SENT)
  taxType: String
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorCreated: Vendor @relationship(type: "CREATED", direction: IN)
  hasClient: Client @relationship(type: "HAS", direction: OUT)
  hasAdmin: Admin @relationship(type: "HAS", direction: OUT)
  hasService: [Service!]! @relationship(type: "HAS", direction: OUT)
}

type Service {
  id: String
  serviceName: String
  price: Int
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
}

type SupportTicket {
  id: ID! @id(autogenerate: true)
  ticket: String! @default(value: "Not Available")
  clientHas: Client @relationship(type: "HAS", direction: IN)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
}

type Module {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  sampleStatus: SampleStatus @default(value: NOT_SENT)
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

type Leads {
  id: ID! @id(autogenerate: true)
  email: String!
  phone: String
  industry: String
  gstNumber: String
  message: String
  createdAt: String
  duration: String
  vendorAddress: String
  price: Int
  condition: String @default(value: "User Created")
  status: Status @default(value: PENDING)
  clientHas: Client @relationship(type: "HAS", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type Counter {
  projectCount: Int @default(value: 1000)
  moduleCount: Int @default(value: 1000)
  invoiceCount: Int @default(value: 1000)
}


type CommunicationTicket {
  id: ID! @id(autogenerate: true)
  message: String
  date: DateTime
  sub: String
  files: String
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  hasReply: [Reply!]! @relationship(type: "HAS", direction: OUT)
  forVendor: [Vendor!]! @relationship(type: "FOR", direction: OUT)
  forClient: [Client!]! @relationship(type: "FOR", direction: OUT)
}

type Reply {
  id: ID! @id(autogenerate: true)
  replyMessage: String
  senderEmail: String
  communicationticketHas: CommunicationTicket @relationship(type: "HAS", direction: IN)
  clientHas: Client @relationship(type: "HAS", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
}

type Mutation {
  signUp(email: String!, name: String!): String! 
  signIn(email: String!, name: String!): String!
}




`;


