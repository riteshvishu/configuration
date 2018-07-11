package gw.contact

uses java.lang.StringBuffer

enhancement ContactKanjiEnhancement : entity.Contact {

  /**
   * Returns the account kanji name that should be used for all the accounts where this contact is the the account holder.
   */
  property get AccountNameKanji() : String {
    if (this typeis Person) {
      var sbuf = new StringBuffer()
      if (this.LastNameKanji != null) {
        sbuf.append(this.LastNameKanji)
      }
      if (this.FirstNameKanji != null) {
        sbuf.append(this.FirstNameKanji)
      }
      return sbuf.toString().Empty ? null : sbuf.toString()
    } else {
      return this.NameKanji
    }
  }
}
