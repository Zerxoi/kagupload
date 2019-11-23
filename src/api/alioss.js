import OSS from 'ali-oss'

export default function Client () {
  return new OSS({
    region: 'oss-cn-hongkong',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
    accessKeyId: 'STS.NR6vzczBfh4tdscYyuajJuKdC',
    accessKeySecret: '5fAMBL7HUuXthzjjKny7GCpJoqa2eKE1s1EfbbbSz84H',
    stsToken: 'CAIS7gF1q6Ft5B2yfSjIr5GDPcDXl51H3/afZlXSvXkgbeVmmo7PoTz2IHxNfXVpAuAWsPk3nWhY5/gZlqFoV4RySUHBapP7SxSGcEbzDbDasumZsJYm6vT8a0XxZjf/2MjNGZabKPrWZvaqbX3diyZ32sGUXD6+XlujQ/br4NwdGbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8AGyZQhKwlMt0zwkuPXmn5fCtUWP1QDAp7VL99irEP+NdNJxOZpzadCx0dFte7DJuCwqsEQTrfsv1/wUp2qf54nNUgcK+XqcOu/O9dliPPz52W6L7XAvGoABlwMy117Ge1vZJfdmKMas9v4EwM3t9uzpSFQuX4tdMcMYlqCwykGKoq1PAJ+N7/HtxGTujA5pJXGbT6b8Y+fJyafSRdKE08IoBLPla0mWRcTyBjvRQjNWhkw2vQuyujORW3d7ChNN8EGCj9JpS4EC37XObJuTCmjvbMFlv7W7JpY=',
    bucket: 'gilivue'
  })
}