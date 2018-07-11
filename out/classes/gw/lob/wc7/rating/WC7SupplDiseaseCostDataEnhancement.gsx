package gw.lob.wc7.rating

enhancement WC7SupplDiseaseCostDataEnhancement : gw.lob.wc7.rating.WC7SupplDiseaseCostData {
  /**
   * Returns WC7DiseaseCode of the Supplementary disease exposure related to this cost
   */
  function getWC7DiseaseCode(workersCompLine : WC7WorkersCompLine) : WC7DiseaseCode {
    return workersCompLine.AllWC7SupplDiseaseExposuresWM.firstWhere(\ w -> w.FixedId == this.ExposureID).DiseaseCode
  }   
}
