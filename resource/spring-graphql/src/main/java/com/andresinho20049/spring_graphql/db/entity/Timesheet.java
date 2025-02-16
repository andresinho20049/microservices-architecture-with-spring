package com.andresinho20049.spring_graphql.db.entity;

import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "timesheet")
public class Timesheet {

    @Id
    private Long id;

    private LocalDate createdAt;

    @LastModifiedDate
    private LocalDate updatedAt;

    @LastModifiedBy
    private String updatedUsername;

    private Long employeeId;

    private Long projectId;

    private LocalDate periodStart;

    private LocalDate periodEnd;

    private Long companyId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDate getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getUpdatedUsername() {
		return updatedUsername;
	}

	public void setUpdatedUsername(String updatedUsername) {
		this.updatedUsername = updatedUsername;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public LocalDate getPeriodStart() {
		return periodStart;
	}

	public void setPeriodStart(LocalDate periodStart) {
		this.periodStart = periodStart;
	}

	public LocalDate getPeriodEnd() {
		return periodEnd;
	}

	public void setPeriodEnd(LocalDate periodEnd) {
		this.periodEnd = periodEnd;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(companyId, createdAt, employeeId, id, periodEnd, periodStart, projectId, updatedAt,
				updatedUsername);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Timesheet other = (Timesheet) obj;
		return Objects.equals(companyId, other.companyId) && Objects.equals(createdAt, other.createdAt)
				&& Objects.equals(employeeId, other.employeeId) && Objects.equals(id, other.id)
				&& Objects.equals(periodEnd, other.periodEnd) && Objects.equals(periodStart, other.periodStart)
				&& Objects.equals(projectId, other.projectId) && Objects.equals(updatedAt, other.updatedAt)
				&& Objects.equals(updatedUsername, other.updatedUsername);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Timesheet [");
		if (id != null) {
			builder.append("id=");
			builder.append(id);
			builder.append(", ");
		}
		if (createdAt != null) {
			builder.append("createdAt=");
			builder.append(createdAt);
			builder.append(", ");
		}
		if (updatedAt != null) {
			builder.append("updatedAt=");
			builder.append(updatedAt);
			builder.append(", ");
		}
		if (updatedUsername != null) {
			builder.append("updatedUsername=");
			builder.append(updatedUsername);
			builder.append(", ");
		}
		if (employeeId != null) {
			builder.append("employeeId=");
			builder.append(employeeId);
			builder.append(", ");
		}
		if (projectId != null) {
			builder.append("projectId=");
			builder.append(projectId);
			builder.append(", ");
		}
		if (periodStart != null) {
			builder.append("periodStart=");
			builder.append(periodStart);
			builder.append(", ");
		}
		if (periodEnd != null) {
			builder.append("periodEnd=");
			builder.append(periodEnd);
			builder.append(", ");
		}
		if (companyId != null) {
			builder.append("companyId=");
			builder.append(companyId);
		}
		builder.append("]");
		return builder.toString();
	}

}