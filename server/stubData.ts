/** stub 载荷 · 非 live CLI；契约名对齐 SPEC `obs_status.v1` / `obs_timeline.v1` */

export type ObsStatusV1 = {
  schema: 'obs_status.v1'
  source: 'stub'
  generated_at: string
  task_path: string | null
  may_start_30: boolean
  gates: Array<{ id: string; status: string }>
  note: string
}

export type ObsTimelineV1 = {
  schema: 'obs_timeline.v1'
  source: 'stub'
  generated_at: string
  task_path: string | null
  events: Array<{
    at: string
    kind: string
    summary: string
  }>
  note: string
}

export function stubObsStatus(taskPath: string | null = null): ObsStatusV1 {
  return {
    schema: 'obs_status.v1',
    source: 'stub',
    generated_at: new Date().toISOString(),
    task_path: taskPath,
    may_start_30: true,
    gates: [
      { id: 'HG-TASK-DRAFT', status: 'approved' },
      { id: 'HG-AUDIT-R1', status: 'approved' },
      { id: 'HG-GRAPH-MODULES', status: 'approved' },
    ],
    note: 'stub 切换态 · 非 live harness CLI · 非签收真值',
  }
}

export function stubObsTimeline(taskPath: string | null = null): ObsTimelineV1 {
  return {
    schema: 'obs_timeline.v1',
    source: 'stub',
    generated_at: new Date().toISOString(),
    task_path: taskPath,
    events: [
      {
        at: new Date().toISOString(),
        kind: 'stub',
        summary: 'stub timeline · 默认请用 live（?source=live 或不传）',
      },
    ],
    note: 'stub 切换态 · 非 live harness CLI · 非签收真值',
  }
}
