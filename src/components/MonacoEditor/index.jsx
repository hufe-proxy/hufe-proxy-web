import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react';

const defaultValue = `{
  "success": true,
  "errorDetail": null,
  "count": 0,
  "data": {

  },
  "appid": "-1",
  "traceid": "-1",
  "hostip": "127.0.0.1"
}`

export default function MonacoEditor(props) {

  const containerRef = useRef()
  const instanceRef = useRef()


  useEffect(() => {
    const dom = containerRef.current
    if (dom) {
      const monacoInstance = monaco.editor.create(dom, {
        value: props.value || defaultValue,
        language: 'json'
      });

      instanceRef.current = monacoInstance
      props.onRef(monacoInstance)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
    </div>
  );
}