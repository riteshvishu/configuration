package gw.admin.wc7
uses entity.WC7AffinityGroup

uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.util.DisplayableException

class WC7AffinityGroupUtil {

  static function createNewAffinityGroup() : WC7AffinityGroup {
    return PLDependencies.getNavigator().getTopLocation().newInstance(WC7AffinityGroup) as WC7AffinityGroup
  }

  /**
   * Adds the given {@link WC7AffinityGroupProducerCode} to the {@link WC7AffinityGroup}
   *
   * @param group - the affinity group to use.
   * @param affinityGroupProducerCode - the affinity group producer code to add.
   */
  static function addAffinityGroupProducerCode(group : WC7AffinityGroup, affinityGroupProducerCode : WC7AffinityGroupProducerCode) {
    if (affinityGroupProducerCode == null) {
      return
    }
    affinityGroupProducerCode.AffinityGroup = group
    group.addToAffinityGroupProducerCodes(affinityGroupProducerCode) 
  }  

  /**
   * Creates a new {@link WC7AffinityProducerCode} if the {@link ProducerCode} does not already have an affinity group
   * that's equal to the passed in {@link WC7AffinityGroup}
   *
   * @param group - the affinity group to use.
   * @param affinityGroupProducerCode - the producer code to add.
   * @return {@link WC7AffinityGroupProducerCode} - the newly created affinity group producer code
   */
  @Throws(DisplayableException, "If the producer code already exists")
  static function createAffinityGroupProducerCode(group : WC7AffinityGroup, producerCode : ProducerCode) : WC7AffinityGroupProducerCode {
    // Check that the producer code's affinity groups are not already assigned to the passed in group
    if (producerCode == null or group == null) {
      return null
    }
    
    if (producerCode.AffinityGroupProducerCodes.hasMatch(\ code -> code.AffinityGroup == group)) {
      throw new DisplayableException(displaykey.Web.Admin.ProducerCodeExists(producerCode.Code))
    }

    // Create a new affinity group producer code, and assign it to the passed in group as well as adding it to the
    // list of producer codes
    var affinityGroupProducerCode = new WC7AffinityGroupProducerCode()
    affinityGroupProducerCode.AffinityGroup = group
    producerCode.addToAffinityGroupProducerCodes(affinityGroupProducerCode)
    
    return affinityGroupProducerCode
  }

   
  /**
   * Finds all {@link WC7AffinityGroupProducerCode} for the given {@link WC7AffinityGroup}
   *
   * @param group - the affinity group to match.
   * @return all producer codes that match the given group.
   */
  static function findProducerCodesByAffinityGroup(group : WC7AffinityGroup) : IQueryBeanResult<WC7AffinityGroupProducerCode> {
    return Query.make(WC7AffinityGroupProducerCode).compare("AffinityGroup", Equals, group.ID).select()
  }

  /**
   * Removes the given {@link WC7AffinityGroupProducerCode} from the {@link ProducerCode}
   *
   * @param group - the group to use.
   * @param affinityGroupProducerCode - the {@link WC7AffinityGroupProducerCode} to remove.
   */
  static function remove(group : WC7AffinityGroup, affinityGroupProducerCode : WC7AffinityGroupProducerCode) {
    if (group == null or affinityGroupProducerCode == null) {
      return
    }
    var producerCode = affinityGroupProducerCode.getProducerCode()
    producerCode.removeFromAffinityGroupProducerCodes(affinityGroupProducerCode)
    group.removeFromAffinityGroupProducerCodes(affinityGroupProducerCode)
  }
}
