export const API = Object.freeze({
  // HOST: "http://localhost:8000",
  // BROKER_NODE_A: "http://localhost:8000",
  // BROKER_NODE_B: "http://localhost:8000",
  HOST: "http://18.218.77.191:80",
  BROKER_NODE_A: "http://18.218.77.191",
  BROKER_NODE_B: "http://18.218.77.191",
  V1_UPLOAD_SESSIONS_PATH: "/api/v1/upload-sessions",
  V2_UPLOAD_SESSIONS_PATH: "/api/v2/upload-sessions",
  CHUNKS_PER_REQUEST: 10
});

export const IOTA_API = Object.freeze({
  PROVIDER_A: "https://nodes.thetangle.org:443",
  PROVIDER_B: "http://eugene.iotasupport.com:14999",
  PROVIDER_C: "http://eugeneoldisoft.iotasupport.com:14265",
  ADDRESS_LENGTH: 81
});

export const UPLOAD_STATUSES = Object.freeze({
  PENDING: "PENDING",
  SENT: "SENT",
  FAILED: "FAILED"
});

export const FILE = Object.freeze({
  CHUNK_BYTE_SIZE: 500
});
