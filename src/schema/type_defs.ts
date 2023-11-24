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
  EVENT
  SUB_CATEGORY
}

enum InterestTypeEnum{
  TEST
  EVENT
  PRODUCT
  LEARN
  SERVICE
}

enum NotificationType {
  ADMIN
  VENDOR
  CLIENT
  GENERAL
}

enum ModuleTypeEnum {
  TEST
  PROJECT
}
enum UserCreatedByEnum {
  ADMIN
  SELF
}

enum LeadStatusEnum {
  ATTEMPTED_TO_CONTACT
  CONTACT_IN_FUTURE
  CONTACTED
  JUNK_LEAD
LOST_LEAD
NOT_CONTACTED
PRE_QUALIFIED
NOT_QUALIFIED

}

enum LeadSourceEnum {
  ADVERTISEMENT
  COLD_CALL
  EMPLOYEE_REFERRAL
  EXTERNAL_REFERRAL
  ONLINE_STORE
  PARTNER
  PUBLIC_RELATIONS
  SALES_EMAIL_ALIAS
  SEMINAR_PARTNER
  INTERNAL_SEMINAR
  TRADE_SHOW
  WEB_DOWNLOAD
  WEB_RESEARCH
  CHAT
  FACEBOOK
  GOOGLE_PLUS
  LINKEDIN
  TWITTER
  WEBSITE
}
enum InvoiceTypeEnum {
SERVICE
PRODUCT
SOLUTION
LEARN
EVENT
}

type Counter {
  projectCount: Int @default(value: 1000)
  moduleCount: Int @default(value: 1000)
  invoiceCount: Int @default(value: 1000)
  quotationCount: Int @default(value: 1000)
  testCount: Int @default(value: 1000)
  userCount: Int @default(value: 1000)
  supportCount: Int @default(value: 1000)
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
  hasManyEquipment: Equipment @relationship(type: "HAS_MANY", direction: OUT)
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
  service: [String] 
  equipmentDocs: [String]
  adminApproved: Admin @relationship(type: "APPROVED", direction: IN)
  hasModuleticket: [ModuleTicket!]! @relationship(type: "HAS", direction: OUT)
  hasNotification: [Notification!]! @relationship(type: "HAS", direction: OUT)
  createdInvoice: [Invoice!]! @relationship(type: "CREATED", direction: OUT)
  hasSupportticket: SupportTicket @relationship(type: "HAS", direction: OUT)
  userIs: User @relationship(type: "IS", direction: IN)
  hasLeads: Leads @relationship(type: "HAS", direction: OUT)
  communicationticketFor: [CommunicationTicket!]! @relationship(type: "FOR", direction: IN)
  hasReply: Reply @relationship(type: "HAS", direction: OUT)
  hasManagement: Management @relationship(type: "HAS", direction: OUT)
  hasAboutpage: AboutPage @relationship(type: "HAS", direction: OUT)
  hasFeaturespage: FeaturesPage @relationship(type: "HAS", direction: OUT)
  hasManyEquipment: [Equipment!]! @relationship(type: "HAS_MANY", direction: OUT)
}

type User {
  userId: String
  name: String
  email: String
  image: String
  phone: String
  bio: String
  id: ID @id(autogenerate: true)
  panCardNo: String
  phoneNumber: String
  createdAt: DateTime
  companyName: String
  companyEmail: String
  status: Status @default(value: PENDING)
  user_type: UserType
  permissions: [String]
  gstNumber: String
  title: String
  education: String
  department: String
  companyPhone: String
  linkedin: String
  twitter: String
  skypeId: String
  experience: String
  specialty: String
  interest: String
  companyDescription: String
  createdBy: UserCreatedByEnum
  isViewed: Boolean @default(value: false)
  isAdmin: Admin @relationship(type: "IS", direction: OUT)
  isVendor: Vendor @relationship(type: "IS", direction: OUT)
  isClient: Client @relationship(type: "IS", direction: OUT)
  hasDocuments: Documents @relationship(type: "HAS", direction: OUT)
  hasRole: Role @relationship(type: "HAS", direction: OUT)
  hasEmployee: Employee @relationship(type: "HAS", direction: OUT)
  communicationticketFor: CommunicationTicket @relationship(type: "FOR", direction: IN)
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
  type: String
  priority: String
  isViewed: Boolean @default(value: false)
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
  hasEquipmentattachment: EquipmentAttachment @relationship(type: "HAS", direction: OUT)
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
type EquipmentAttachment {
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
  rejectedReason: String
  reports: [String]
  isViewed: Boolean @default(value: false)
  isViewedByClient: Boolean @default(value: false)
  isViewedByVendor: Boolean @default(value: false)
  isComplainedViewed: Boolean @default(value: false)
  isApproveRequestViewed: Boolean @default(value: false)
  createdAt: DateTime
  isApprovedByAdmin: Boolean @default(value: false)
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
  notificationFor: NotificationType
  isViewed: Boolean @default(value: false)
  createdAt: DateTime
  clientHas: [Client!]! @relationship(type: "HAS", direction: IN)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorHas: [Vendor!]! @relationship(type: "HAS", direction: IN)
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
  type: InvoiceTypeEnum
  paymentStatus: String
  hsn: String
  isQuotation: Boolean @default(value: false)
  isViewed: Boolean @default(value: false)
  isViewedByClient: Boolean @default(value: false)
  placeOfSupply: String
  subject: String
  expiryDate: DateTime
  status: InvoiceStatus @default(value: SENT)
  sentBy: SentBy @default(value: ADMIN)
  taxType: String
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  vendorCreated: Vendor @relationship(type: "CREATED", direction: IN)
  hasClient: Client @relationship(type: "HAS", direction: OUT)
  hasAdmin: Admin @relationship(type: "HAS", direction: OUT)
  hasPurchase: [Purchase!]! @relationship(type: "HAS", direction: OUT)
  hasTermspage: TermsPage @relationship(type: "HAS", direction: OUT)
}

type  Purchase {
  id: String
  itemName: String
  price: Int
  quantity: Int
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
}

type SupportTicket {
  id: ID! @id(autogenerate: true)
  ticket: String! @default(value: "Not Available")
  createdAt: DateTime
  isViewed: Boolean @default(value: false)
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
  ticket: String
  reports: [String]
  complain: String
  status: Status @default(value: PENDING)
  type: ModuleTypeEnum @default(value: PROJECT)
  sampleStatus: SampleStatus @default(value: NOT_SENT)
  projectHas: Project @relationship(type: "HAS", direction: IN)
  moduleticketFor: ModuleTicket @relationship(type: "FOR", direction: IN)
  hasDocuments: Documents @relationship(type: "HAS", direction: OUT)
}



type Leads {
  id: ID! @id(autogenerate: true)
  name: String
  email: String
  phone: String
  industry: String
  gstNumber: String
  message: String
  createdAt: DateTime
  duration: String
  vendorAddress: String
  price: Int
  isViewed: Boolean @default(value: false)
  type: String
  interest: String
  condition: String @default(value: "User Created")
  leadOwner: String
  company: String
  Title : String
  Phone : String
  officePhone: String
  website: String
  leadSource: LeadSourceEnum @default(value: WEBSITE)
  leadStatus: LeadStatusEnum
  employeeCount: String
  annualRevenue: String
  ratting: LeadStatusEnum
  skypeId: String
  secondaryEmail: String
  twitter: String
  linkedin: String
  description: String
  createdBy: String
  updatedBy: String
  updatedAt: DateTime
  status: Status @default(value: PENDING)
  clientHas: Client @relationship(type: "HAS", direction: IN)
  vendorHas: Vendor @relationship(type: "HAS", direction: IN)
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}




type CommunicationTicket {
  id: ID! @id(autogenerate: true)
  message: String
  date: DateTime
  sub: String
  sender: UserType
  files: [String]
  isViewed: Boolean @default(value: false)
  adminCreated: Admin @relationship(type: "CREATED", direction: IN)
  hasReply: [Reply!]! @relationship(type: "HAS", direction: OUT)
  forVendor: [Vendor!]! @relationship(type: "FOR", direction: OUT)
  forClient: [Client!]! @relationship(type: "FOR", direction: OUT)
  forUser: User @relationship(type: "FOR", direction: OUT)
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
  moduelid: ID! @id(autogenerate: true)
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
  categoryHas: [Category!]! @relationship(type: "HAS", direction: IN)
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
  sideImage: String
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
  category: String
  registrationUrl: String
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
  createdAt: DateTime
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
  createdAt: DateTime
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type TermsPage {
  id: ID! @id(autogenerate: true)
  title: String
  content: String
  slug: String
  downloadUrl: String
  forInvoice: Boolean @default(value: false)
  adminHas: Admin @relationship(type: "HAS", direction: IN)
  invoiceHas: Invoice @relationship(type: "HAS", direction: IN)
}


type LearnItem {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  url: String
  imageUrl: String
  mode: String
  rating: String
  courseFor: String
  duration: String
  certification : String
  accredited: String
  startDate: DateTime
  endDate: DateTime
  createdAt: DateTime
  seats: Int
  price: Int
  credit: String
  adminHas: Admin @relationship(type: "HAS", direction: IN)
}

type Hero {
  id: ID! @id(autogenerate: true)
  title: String
  image: String
  homepageHas: HomePage @relationship(type: "HAS", direction: IN)
}

type AboutUsSection {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  imageUrl: String
  homepageHas: HomePage @relationship(type: "HAS", direction: IN)
  hasPoints: [Points!]! @relationship(type: "HAS", direction: OUT)
}

type Points {
  id: ID! @id(autogenerate: true)
  title: String
  description: String
  url: String
  iconUrl: String
  aboutussectionHas: AboutUsSection @relationship(type: "HAS", direction: IN)
}

type Mutation {
  signUp(email: String!, name: String!, user_type: String!): String! 
  signIn(email: String!): String!
}

type ModuleTicket {
  id: ID! @id(autogenerate: true)
  hasTestticket: TestTicket @relationship(type: "HAS", direction: OUT)
}

type TestTicket {
  id: String
  createdAt: DateTime
  description: String
  ticket: String
  reports: [String]
  title: String
  status: Status @default(value: PENDING)
  moduleticketHas: ModuleTicket @relationship(type: "HAS", direction: IN)
  hasModule: [Module!]! @relationship(type: "HAS", direction: OUT)
  userHas: User @relationship(type: "HAS", direction: IN)
}

type User {
  id: ID! @id(autogenerate: true)
  hasTestticket: TestTicket @relationship(type: "HAS", direction: OUT)
  moduleFor: Module @relationship(type: "FOR", direction: IN)
  hasModule: Module @relationship(type: "HAS", direction: OUT)
}


type Module {
  id: ID! @id(autogenerate: true)
  testticketHas: TestTicket @relationship(type: "HAS", direction: IN)
  forUser: User @relationship(type: "FOR", direction: OUT)
  userHas: User @relationship(type: "HAS", direction: IN)
}


type User {
  id: ID! @id(autogenerate: true)
  hasPrimaryaddress: PrimaryAddress @relationship(type: "Has", direction: OUT)
  hasSecondaryaddress: SecondaryAddress @relationship(type: "Has", direction: OUT)
}

type PrimaryAddress {
  id: ID! @id(autogenerate: true)
  street: String
  city: String
  state: String
  Country: String
  zipCode: String
  userHas: User @relationship(type: "Has", direction: IN)
  leadsHas: Leads @relationship(type: "Has", direction: IN)
}

type SecondaryAddress {
  id: ID! @id(autogenerate: true)
  street: String
  city: String
  state: String
  Country: String
  zipCode: String
  userHas: User @relationship(type: "Has", direction: IN)
}

type Equipment {
  id: ID! @id(autogenerate: true)
  name: String
  model: String
  make: String
  yearOfInstallation: String
  calibrationDetails: String
  warranty: String
  attachment: [String]
  vendorHasMany: Vendor @relationship(type: "HAS_MANY", direction: IN)
}

type Leads {
  id: ID! @id(autogenerate: true)
  hasPrimaryaddress: PrimaryAddress @relationship(type: "Has", direction: OUT)
}

type Equipment {
  id: ID! @id(autogenerate: true)
  clientHasMany: Client @relationship(type: "HAS_MANY", direction: IN)
}

`;


