package com.inswave.ws.tmpl.adapter;

public abstract class BaseBean {
	
	private String submissionid;

	public String getSubmissionid() {
		return submissionid;
	}

	public void setSubmissionid(String submissionid) {
		this.submissionid = submissionid;
	}
	
	/**
	 * Constructs a <code>String</code> with all attributes
	 * in name = value format.
	 *
	 * @return a <code>String</code> representation
	 * of this object.
	 */
	public String toString()
	{
	    final String TAB = "    ";

	    String retValue = "";

	    retValue = "BaseBean ( "
	        + super.toString() + TAB
	        + "submissionid = " + this.submissionid + TAB
	        + " )";

	    return retValue;
	}

	
}
