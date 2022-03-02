
// Embedded dashboards let you build an interactive and highly curated data experience within your application
// This file is used to embed a dashboard using LookerEmbedSDK with EmbedBuilder to initialize your connection and help create the iframe element

import React, { useCallback, useEffect } from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { Select, Space } from '@looker/components'
import { PageTitle } from '../common/PageTitle'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { sdk } from '../../helpers/CorsSessionHelper'
import { DashboardFilter, Filter, i18nResources, ComponentsProvider, useSuggestable, useExpressionState } from '@looker/filter-components'
import { SupportedDownloadSettings } from '@looker/sdk/lib/3.1/models'

const EmbedDashboardWFilters = () => {
  const [loading, setLoading] = React.useState(true)
  const [dashboardFilters, setDashboardFilters] = React.useState()
  const [filterValues, setFilterValues] = React.useState({})

  useEffect(() => {
    const initialize = async() => {
      const filters = await  sdk.ok(sdk.dashboard('data_block_acs_bigquery::acs_census_overview', 'dashboard_filters'));
      console.log(filters['dashboard_filters']);
      setDashboardFilters(filters['dashboard_filters']);
    }
      initialize();
  },[])

  const handleFilterChange = (event, label) => {
    console.log('changed',event)
    console.log('changed',label)
    console.log({
      "State" :"PA",
      "County" :"Test"
    })
    let filterChange = filterValues;
    filterChange[label] = event;
    console.log("filter change",filterChange);
    setFilterValues(filterChange);
  }


  /*
   Step 1 Initialization of the EmbedSDK happens when the user first access the application
   See App.js for reference
  */

  const makeDashboard = useCallback((el) => {
    if (!el) {
      return
    }
    el.innerHTML = ''
    /*
      Step 2 Create your dashboard (or other piece of embedded content) through a simple set of chained methods
    */
    LookerEmbedSDK.createDashboardWithId("data_block_acs_bigquery::acs_census_overview")
      // adds the iframe to the DOM as a child of a specific element
      .appendTo(el)
      .withFilters(filterValues)
      // this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
      .build()
      // this establishes event communication between the iframe and parent page
      .connect()
      .then(() => setLoading(false))
      // catch various errors which can occur in the process (note: does not catch 404 on content)
      .catch((error) => {
        console.error('An unexpected error occurred', error)
      })
  }, [filterValues])


  return (
    <Space>
      <div className={"embed-dashboard-main"}>
        <PageTitle text={'Embedded Dashboard With Filters'} />
        <LoadingSpinner loading={loading}/>
        <ComponentsProvider resources={i18nResources}>
        {dashboardFilters?.map((filter) => {
          console.log(filter);
          return (
            <>
            <DashFilters filter={filter} expression={filterValues[filter.name]} onChange={(event) => handleFilterChange(event, filter.name)} />
            </>
          )

        })}
        </ComponentsProvider>
        { /* Step 0) we have a simple container, which performs a callback to our makeDashboard function */}
        <Dashboard ref={makeDashboard}></Dashboard>
      </div>
    </Space>
  )
}

// A little bit of style here for heights and widths.
const Dashboard = styled.div`
  width: 100%;
  height: 80vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`
export default EmbedDashboardWFilters


export const DashFilters =({filter, expression, onChange}) => {
  const stateProps = useExpressionState({
    filter,
    // These props will likely come from higher up in your application
    expression,
    onChange,
  })

  const { errorMessage, suggestableProps } = useSuggestable({
    filter,
    sdk,
  })

  return(
    <>
      <Filter
        name={filter.name}
        type={filter.type}
        config={{type:'dropdown_menu'}}
        {...suggestableProps}
        {...stateProps}
        />
    </>
  )

}