export  const typeDefs = `


enum UserType  {
  EMPLOYEE
  ADMIN
  SERVICE_PROVIDER
  CONSUMER
  COVENTEN_EMPLOYEE
  LAB_ASSISTANT
}

enum Status {
  CREATED
  PENDING
  UNDER_REVIEW
  DRAFT
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
  CONFIRMED
}

enum SentBy{
  ADMIN
  VENDOR
}

enum  CategoryTypeEnum{
  SERVICE
  PRODUCT
  SOLUTION
  SUB_CATEGORY
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
  hasProject: Project @relationship(type: "HAS", direction: OUT)
  userIs: User @relationship(type: "IS", direction: IN)
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
  hasLeads: Leads @relationship(type: "HAS", direction: OUT)
  createdCommunicationticket: CommunicationTicket @relationship(type: "CREATED", direction: OUT)
  createdRole: Role @relationship(type: "CREATED", direction: OUT)
  createdService: Service @relationship(type: "CREATED", direction: OUT)
  hasLog: Log @relationship(type: "HAS", direction: OUT)
  hasProduct: Product @relationship(type: "HAS", direction: OUT)
  hasCategory: Category @relationship(type: "HAS", direction: OUT)
  hasEvent: [Event!]! @relationship(type: "HAS", direction: OUT)
  hasIndustrypage: [IndustryPage!]! @relationship(type: "HAS", direction: OUT)
  createdSolutionpage: SolutionPage @relationship(type: "CREATED", direction: OUT)
  hasTermspage: TermsPage @relationship(type: "HAS", direction: OUT)
  hasLearnitem: LearnItem @relationship(type: "HAS", direction: OUT)
}

type Vendor {
  id: ID! @id(autogenerate: true)
  industry: [String]
  sub_type: String
  labImage: String
  adminApproved: Admin @relationship(type: "APPROVED", direction: IN)
  hasModuleticket: ModuleTicket @relationship(type: "HAS", direction: OUT)
  hasNotification: Notification @relationship(type: "HAS", direction: OUT)
  createdInvoice: [Invoice!]! @relationship(type: "CREATED", direction: OUT)
  hasSupportticket: SupportTicket @relationship(type: "HAS", direction: OUT)
  userIs: User @relationship(type: "IS", direction: IN)
  hasLeads: Leads @relationship(type: "HAS", direction: OUT)
  communicationticketFor: CommunicationTicket @relationship(type: "FOR", direction: IN)
  hasReply: Reply @relationship(type: "HAS", direction: OUT)
  hasManagement: Management @relationship(type: "HAS", direction: OUT)
  hasAboutpage: AboutPage @relationship(type: "HAS", direction: OUT)
  hasFeaturespage: FeaturesPage @relationship(type: "HAS", direction: OUT)
}

type User {
  name: String
  email: String
  image: String
  phone: String
  bio: String
  id: ID @id(autogenerate: true)
  address: String
  city: String
  state: String
  zip: String
  pan: String
  createdAt: DateTime
  companyName: String
  companyEmail: String
  status: Status @default(value: PENDING)
  user_type: UserType
  permissions: [String]
  gstNumber: String
  isAdmin: Admin @relationship(type: "IS", direction: OUT)
  isVendor: Vendor @relationship(type: "IS", direction: OUT)
  isClient: Client @relationship(type: "IS", direction: OUT)
  hasDocuments: Documents @relationship(type: "HAS", direction: OUT)
  hasRole: Role @relationship(type: "HAS", direction: OUT)
  hasEmployee: Employee @relationship(type: "HAS", direction: OUT)
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
  id: ID! @id(autogenerate: true)
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
  id: ID! @id(autogenerate: true)
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
  createdAt: DateTime
  clientHas: Client @relationship(type: "HAS", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
  projectticketHas: ProjectTicket @relationship(type: "HAS", direction: IN)
  forModule: Module @relationship(type: "FOR", direction: OUT)
  userHas: User @relationship(type: "Has", direction: IN)
  managementSentReports: Management @relationship(type: "SENT_REPORTS", direction: IN)
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
  ticket: String @default(value: "Not Available")
  clientName: String
  clientAddress: String
  clientEmail: String
  totalPrice: Int
  createdAt: DateTime
  priceWithTax: Int
  complain: String
  taxRate: Int
  status: InvoiceStatus @default(value: SENT)
  sentBy: SentBy @default(value: ADMIN)
  taxType: String
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorCreated: Vendor @relationship(type: "CREATED", direction: IN)
  hasClient: Client @relationship(type: "HAS", direction: OUT)
  hasAdmin: Admin @relationship(type: "HAS", direction: OUT)
  hasPurchase: [Purchase!]! @relationship(type: "HAS", direction: OUT)
}

type  Purchase {
  id: String
  itemName: String
  price: Int
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
}

type SupportTicket {
  id: ID! @id(autogenerate: true)
  ticket: String! @default(value: "Not Available")
  createdAt: DateTime
  clientHas: Client @relationship(type: "HAS", direction: IN)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
}

type Module {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  createdAt: DateTime
  files:[String]
  sampleStatus: SampleStatus @default(value: NOT_SENT)
  projectHas: Project @relationship(type: "HAS", direction: IN)
  moduleticketFor: ModuleTicket @relationship(type: "FOR", direction: IN)
  hasDocuments: Documents @relationship(type: "HAS", direction: OUT)
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
  projectCount: Int @default(value: 1)
  moduleCount: Int @default(value: 1)
  invoiceCount: Int @default(value: 1)
}


type CommunicationTicket {
  id: ID! @id(autogenerate: true)
  message: String
  date: DateTime
  sub: String
  sender: UserType
  files: [String]
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

type Role {
  id: ID! @id(autogenerate: true)
  name: String
  permissions: [String] 
  createdAt: DateTime
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  userHas: User @relationship(type: "HAS", direction: IN)
}

type Management {
  id: ID! @id(autogenerate: true)
  moduelid: String!
  moduleTitle: String!
  reports: [String]
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
  sentReportsModuleticket: ModuleTicket @relationship(type: "SENT_REPORTS", direction: OUT)
}

type Employee {
  id: ID @id(autogenerate: true)
  employerEmail: String!
  userHas: User @relationship(type: "HAS", direction: IN)
}

type Service {
  id: ID @id(autogenerate: true)
  category: String
  coverImageUrl: String
  title: String
  description: String
  slug: String
  pageContent: String
  isPopular: Boolean @default(value: false)
  thumbnailUrl: String
  isService: Boolean @default(value: false)
  isSolution: Boolean @default(value: false)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  categoryHas: Category @relationship(type: "HAS", direction: IN)
}


type Subservice {
  id: ID! @id(autogenerate: true)
  image: String
  title: String
  slug: String
  description: String
  
}


type Log {
  id: ID! @id(autogenerate: true)
  title: String!
  createdAt: DateTime!
  message: String!
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}
type Product {
  id: ID! @id(autogenerate: true)
  title: String
  shortDescription: String
  file: String
  video: String
  features: String
  others: String
  image: String
  isPopular: Boolean @default(value: false)
  isSpecial: Boolean @default(value: false)
  createdAt: DateTime
  price: Int
  adminHas: Admin @relationship(type: "HAS", direction: IN)
  homepageHas: HomePage @relationship(type: "HAS", direction: IN)
  categoryHas: Category @relationship(type: "HAS", direction: IN)
}

type Category {
  id: ID @id(autogenerate: true)
  name: String
  type: CategoryTypeEnum
  categoryHasChild: [Category!]! @relationship(type: "HAS_CHILD", direction: IN)
  hasChildCategory: [Category!]! @relationship(type: "HAS_CHILD", direction: OUT)
  hasService: [Service!]! @relationship(type: "HAS", direction: OUT)
  hasProduct: [Product!]! @relationship(type: "HAS", direction: OUT)
}



type HomePage {
  id: ID! @id(autogenerate: true)
  heroText: String
  heroImage: String
  hasHomeservices: [HomeServices!]! @relationship(type: "HAS", direction: OUT)
  hasHomeclient: [HomeClient!]! @relationship(type: "HAS", direction: OUT)
  hasProduct: [Product!]! @relationship(type: "HAS", direction: OUT)
  hasHero: Hero @relationship(type: "HAS", direction: OUT)
}

type HomeServices {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  slug: String
  homepageHas: HomePage @relationship(type: "HAS", direction: IN)
}

type HomeClient {
  id: ID! @id(autogenerate: true)
  name: String
  logo: String
  homepageHas: HomePage @relationship(type: "HAS", direction: IN)
}

type Event {
  id: ID! @id(autogenerate: true)
  name: String
  slug: String
  description: String
  endAt: DateTime
  startAt: DateTime
  location: String
  image: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}
type Calibration {
  id: ID! @id(autogenerate: true)
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}
type Testing {
  id: ID! @id(autogenerate: true)
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type IndustryPage {
  id: ID! @id(autogenerate: true)
  title: String
  image: String
  description: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}


type SubSolution {
  id: ID @id(autogenerate: true)
  image: String
  title: String
  slug:String
  subtitle: String
  description: String
  solutionpageHas: SolutionPage @relationship(type: "HAS", direction: IN)
}

type SolutionPage {
  id: ID @id(autogenerate: true)
  title: String
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  hasSubsolution: SubSolution @relationship(type: "HAS", direction: OUT)
}

type AboutPage {
  id: ID! @id(autogenerate: true)
  title: String
  image: String
  description: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}
type FeaturesPage {
  id: ID! @id(autogenerate: true)
  title: String
  image: String
  description: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type TermsPage {
  id: ID! @id(autogenerate: true)
  title: String
  content: String
  slug: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type LearnItem {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  url: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type Hero {
  id: ID! @id(autogenerate: true)
  title: String
  image: String
  homepageHas: HomePage @relationship(type: "HAS", direction: IN)
}

type Mutation {
  signUp(email: String!, name: String!, user_type: String!): String! 
  signIn(email: String!): String!
}

 


`;


