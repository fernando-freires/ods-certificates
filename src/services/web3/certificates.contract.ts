import Web3 from "web3";

const address = "0x338e432f9e51C0a16EafcF1F49e140B782d0BeB7";
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "courseName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "courseId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "certificateHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "completionDate",
        type: "uint256",
      },
    ],
    name: "CertificateAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "courseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "courseId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "completionDate",
        type: "uint256",
      },
    ],
    name: "addCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "courseId",
        type: "string",
      },
    ],
    name: "getCertificateByCourseId",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "courseName",
            type: "string",
          },
          {
            internalType: "string",
            name: "courseId",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "certificateHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "completionDate",
            type: "uint256",
          },
        ],
        internalType: "struct Certificates.CertificateData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getCertificateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getCertificates",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "courseName",
            type: "string",
          },
          {
            internalType: "string",
            name: "courseId",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "certificateHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "completionDate",
            type: "uint256",
          },
        ],
        internalType: "struct Certificates.CertificateData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "certificateHash",
        type: "bytes32",
      },
    ],
    name: "verifyCertificate",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export function getCertificatesContract(web3Obj: Web3) {
  return new web3Obj.eth.Contract(abi, address);
}
