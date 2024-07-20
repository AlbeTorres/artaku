interface DBAddress {
  id: string
  firstName: string
  lastName: string
  address: string
  address2: string | null
  zipcode: number
  phone: string
  city: string
  countryId: string
  userId: string
}
export const parseAddress = (address: DBAddress | null) => {
  if (address) {
    const { userId, countryId, address2, ...rest } = address
    if (address2) {
      return { country: countryId, address2, ...rest }
    } else {
      return { country: countryId, ...rest }
    }
  }
}
