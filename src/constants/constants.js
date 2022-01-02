import IntlMessages from "../i18n/IntlMessages";
export const LISTEN = "LISTEN";

// config i18n
export const lang = [
  {
    icon: "/images/flags/england.png",
    name: <IntlMessages id="language.english" />,
    locale: "en",
    languageId: "english",
  },
  {
    icon: "/images/flags/UAE.png",
    name: <IntlMessages id="language.uae" />,
    locale: "ar",
    languageId: "uae",
  },
  {
    icon: "/images/flags/germany.jpg",
    name: <IntlMessages id="language.germany" />,
    locale: "de",
    languageId: "germany",
  },
  {
    icon: "/images/flags/spain.png",
    name: <IntlMessages id="language.spain" />,
    locale: "es",
    languageId: "spain",
  },
  {
    icon: "/images/flags/fr.png",
    name: <IntlMessages id="language.france" />,
    locale: "fr",
    languageId: "france",
  },
  {
    icon: "/images/flags/in.png",
    name: <IntlMessages id="language.india" />,
    locale: "hi",
    languageId: "india",
  },
  {
    icon: "/images/flags/it.png",
    name: <IntlMessages id="language.italia" />,
    locale: "it",
    languageId: "italia",
  },
  {
    icon: "/images/flags/jp.png",
    name: <IntlMessages id="language.japan" />,
    locale: "ja",
    languageId: "japan",
  },
  {
    icon: "/images/flags/pt.png",
    name: <IntlMessages id="language.portugal" />,
    locale: "pt",
    languageId: "portugal",
  },
];

//config language

export const languages = [
  {
    label: <IntlMessages id="language.english" />,
    value: "en",
  },
  {
    label: <IntlMessages id="language.uae" />,
    value: "ar",
  },
  {
    label: <IntlMessages id="language.germany" />,
    value: "de",
  },
  {
    label: <IntlMessages id="language.spain" />,
    value: "es",
  },
  {
    label: <IntlMessages id="language.france" />,
    value: "fr",
  },
  {
    label: <IntlMessages id="language.india" />,
    value: "hi",
  },
  {
    label: <IntlMessages id="language.italia" />,
    value: "it",
  },
  {
    label: <IntlMessages id="language.japan" />,
    value: "ja",
  },
  {
    label: <IntlMessages id="language.portugal" />,
    value: "pt",
  },
];

//config currency
export const listCurrency = [
  {
    label: "Dollar",
    value: "Dollar",
  },
  {
    label: "VND",
    value: "VND",
  },
];

//config s3
export const config = {
  bucketName: "amplify-auctionshopfe-dev-41027-deployment",
  dirName: "img-auction" /* optional */,
  region: "ap-southeast-1",
  accessKeyId: "AKIAQHNK4QOPE75A367I",
  secretAccessKey: "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",
  s3Url: "" /* optional */,
};

export const breadcrumbs = [
  {
    title: <IntlMessages id="profile.home" />,
    url: "/",
  },
  {
    title: <IntlMessages id="profile.editProfile" />,
  },
];
